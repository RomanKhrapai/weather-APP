import { fetchSityInfo } from "./api.js";

import { COUNTRY_NAME } from "./defaultValue.js";

import { renderPodcasttoday } from "./render/renderPodcasttoday.js";
import { renderListSityes } from "./render/renderListSityes.js";
import { renderWidgetErorr } from "./render/renderWidgetErorr.js";
import { renderLoader } from "./render/renderLoader.js";
import { saveState } from "./localStorege/saveState.js";
import { getState } from "./localStorege/getstate.js";
import { renderPodcastForFiveDay } from "./render/renderPodcastForFiveDay.js";
import { renderListStore } from "./render/renderListStore.js";
import {
    getCookiesStore,
    addCookieStore,
    removeCookieStore,
} from "./cookie/cookieFunc.js";
import { noteify } from "./noteify.js";

const refs = {
    tabs: document.querySelector(".tab-buttons"),
    buttonSearch: document.querySelector(".form-search__button"),
    sityesinfo: document.getElementById("show-land"),
    podcastInfo: document.querySelector(".tab-contents"),
    openStore: document.querySelector("[data-store-open]"),
    listStore: document.querySelector("[data-list-store]"),
    searchSity: document.querySelector(".form-search__input"),
};

const state = {
    selectedCoordinate: null,
    isOneDay: false,
    sity: "",
    sityes: [],
    store: [],
};

const showPodcast = () => {
    renderLoader(refs.podcastInfo);
    if (state.isOneDay) {
        renderPodcasttoday(
            state.selectedCoordinate,
            state.sityes,
            state.sity,
            refs.podcastInfo
        );
        return;
    }

    renderPodcastForFiveDay(
        state.selectedCoordinate,
        state.sityes,
        state.sity,
        refs.podcastInfo
    );
};

const selectCoordinateClick = (e) => {
    if (e.target.tagName === "INPUT") {
        state.selectedCoordinate = e.target.id;
        saveState({ selectedCoordinate: e.target.id });

        showPodcast();
    }
};

const tabButtonClick = (e) => {
    const isOneDay = e.target.dataset.time === "now" ? true : false;
    state.isOneDay = isOneDay;
    turnTabButton();
    showPodcast();
    saveState({ isOneDay });
};

const turnTabButton = () => {
    const buttons = [...refs.tabs.children];

    if (!state.isOneDay) {
        buttons[0].classList.remove("tab-button-active");
        buttons[1].classList.add("tab-button-active");
    } else {
        buttons[1].classList.remove("tab-button-active");
        buttons[0].classList.add("tab-button-active");
    }
};

const clickSearchBtn = (e) => {
    e.preventDefault();
    const searchText = refs.searchSity.value.trim();
    searchSity(searchText.replace(/[{}[\]\%/\\&\?\,\'\;:+!@#\$\^*)(]/g, ""));
};

const searchSity = (searchRequest) => {
    if (searchRequest !== "") {
        refs.searchSity.value = searchRequest;
        fetchSityInfo(searchRequest)
            .then((data) => {
                if (data.length === 0) {
                    noteify("Такого міста не знайдено");
                    return;
                }

                state.sityes = data.map((sity) => ({
                    area: sity.state,
                    country: COUNTRY_NAME[sity.country],
                    name: sity?.local_names?.uk ?? sity.name,
                    lat: sity.lat,
                    lon: sity.lon,
                }));
                const weatherdata = data[0];
                state.sity = searchRequest;
                state.selectedCoordinate =
                    weatherdata.lat + "/" + weatherdata.lon;

                renderListSityes(state.sityes, state.sity, refs.sityesinfo);
                showPodcast();
                saveState({
                    sityes: state.sityes,
                    sity: state.sity,
                    selectedCoordinate: state.selectedCoordinate,
                });
                saveStore(searchRequest);
            })
            .catch((error) => {
                if (error == "Error: 404") {
                    renderWidgetErorr("Вибачте сталася помилка сервера 404!");

                    return console.log("Oops");
                }
                renderWidgetErorr("Вибачте сталася помилка!");
                console.log(error);
            });
    }
};

const startRadioSelected = (coordinate) => {
    const radioButtons = refs.sityesinfo.querySelectorAll(".custom-radio");
    if (!coordinate) {
        return;
    }
    if (radioButtons.length > 0) {
        [...radioButtons].find(
            (button) => button.id === coordinate
        ).checked = true;
    }

    state.store = getCookiesStore();
    refs.searchSity.value = state.sity;

    turnTabButton();
    showPodcast();

    refs.listStore.innerHTML = renderListStore(state.store);
};
const modalTogle = () => {};

const saveStore = (name) => {
    if (state.store.some((item) => item === name)) return;

    state.store.push(name);

    if (state.store.length > 5) {
        removeCookieStore(state.store[0]);
        state.store.splice(0, 1);
    }

    addCookieStore(name);

    refs.listStore.innerHTML = renderListStore(state.store);
};

const selectItemStore = (name) => {
    refs.searchSity.value = name;
    searchSity(name);
};

const removeItemStore = (name) => {
    state.store = state.store.filter((item) => item !== name);
    refs.listStore.innerHTML = renderListStore(state.store);
    removeCookieStore(name);
};

const clickItemStore = (e) => {
    const elem = e?.target ?? e;

    if (elem?.dataset?.listStore) return;

    if (elem?.dataset?.storeRemove) {
        return removeItemStore(elem.dataset.storeRemove);
    } else if (elem?.dataset?.name) {
        return selectItemStore(elem.dataset.name);
    } else clickItemStore(elem.parentElement);
};

refs.tabs.addEventListener("click", tabButtonClick);
refs.buttonSearch.addEventListener("click", clickSearchBtn);
refs.sityesinfo.addEventListener("click", selectCoordinateClick);
refs.openStore.addEventListener("click", modalTogle);
refs.listStore.addEventListener("click", clickItemStore);

Object.assign(state, getState());

renderListSityes(state.sityes, state.sity, refs.sityesinfo);
startRadioSelected(state.selectedCoordinate);
