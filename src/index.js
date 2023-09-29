import { fetchSityInfo } from "./api.js";

import { COUNTRY_NAME } from "./defaultValue.js";

import { renderPodcasttoday } from "./render/renderPodcasttoday.js";
import { renderListSityes } from "./render/renderListSityes.js";
import { renderWidgetErorr } from "./render/renderWidgetErorr.js";
import { renderLoader } from "./render/renderLoader.js";
import { saveState } from "./localStorege/saveState.js";
import { getState } from "./localStorege/getstate.js";
import { renderPodcastForFiveDay } from "./render/renderPodcastForFiveDay.js";
import { renderDayInfo } from "./render/renderDayInfo.js";

const refs = {
    tabs: document.querySelector(".tab-buttons"),
    buttonSearch: document.querySelector(".form-search__button"),
    sityesinfo: document.getElementById("show-land"),
    podcastInfo: document.querySelector(".tab-contents"),
    widget: document.querySelector("[widget]"),
};

const state = {
    selectedCoordinate: null,
    isOneDay: false,
    sity: "",
    sityes: [],
    podcastList: {},
    time: null,
};

const saveFetchData = (newData) => {
    state.podcastList = newData;
};

const showPodcast = () => {
    renderLoader(refs.podcastInfo);
    if (state.isOneDay) {
        renderPodcasttoday(
            state.selectedCoordinate,
            state.sityes,
            refs.podcastInfo
        );
        return;
    }

    renderPodcastForFiveDay(
        state.selectedCoordinate,
        state.sityes,
        refs.podcastInfo,
        saveFetchData
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

const searchSity = (e) => {
    e.preventDefault();
    const refSearchSity = document.querySelector(".form-search__input");
    const searchRequest = refSearchSity.value.trim();
    if (searchRequest !== "") {
        fetchSityInfo(searchRequest)
            .then((data) => {
                if (data.length === 0) {
                    alert("Такого міста не знайдено");
                    return;
                }

                state.sityes = data.map((sity) => ({
                    area: sity.state,
                    country: COUNTRY_NAME[sity.country],
                    name: sity.name,
                    localName: sity?.local_names?.uk ?? searchRequest,
                    lat: sity.lat,
                    lon: sity.lon,
                }));

                state.sity = searchRequest;

                if (data.length === 1) {
                    const weatherdata = data[0];

                    state.selectedCoordinate =
                        weatherdata.lat + "/" + weatherdata.lon;

                    refs.sityesinfo.innerHTML = `<h2> Погода в місті "${searchRequest}"</h2>`;
                } else {
                    renderListSityes(state.sityes, state.sity, refs.sityesinfo);
                    state.selectedCoordinate =
                        state.sityes[0].lat + "/" + state.sityes[0].lon;
                    refs.sityesinfo.querySelector(
                        ".custom-radio"
                    ).checked = true;
                }
                showPodcast();
                saveState({
                    sityes: state.sityes,
                    sity: state.sity,
                    selectedCoordinate: state.selectedCoordinate,
                });
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

    turnTabButton();
    showPodcast();
};

refs.tabs.addEventListener("click", tabButtonClick);
refs.buttonSearch.addEventListener("click", searchSity);
refs.sityesinfo.addEventListener("click", selectCoordinateClick);

Object.assign(state, getState());

renderListSityes(state.sityes, state.sity, refs.sityesinfo);
startRadioSelected(state.selectedCoordinate);
