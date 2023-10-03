import { fetchcityInfo } from "./api.js";
import { COUNTRY_NAME } from "./defaultValue.js";
import cookie from "./cookie/cookieFunc.js";
import { noteify } from "./noteify.js";
import localStorage from "./src/local-storage/index.js";
import render from "./render/index.js";

const refs = {
    tabs: document.querySelector(".tab-buttons"),
    buttonSearch: document.querySelector(".form-search__button"),
    cityesInfo: document.getElementById("show-land"),
    podcastInfo: document.querySelector(".tab-contents"),
    openStore: document.querySelector("[data-store-open]"),
    listStore: document.querySelector("[data-list-store]"),
    searchCity: document.querySelector(".form-search__input"),
};

const state = {
    selectedCoordinate: null,
    isOneDay: false,
    city: "",
    cityes: [],
    store: [],
};

const showPodcast = () => {
    render.loader(refs.podcastInfo);

    if (state.isOneDay) {
        render.podcasttoday(
            state.selectedCoordinate,
            state.cityes,
            state.city,
            refs.podcastInfo
        );
    } else {
        render.podcastForFiveDay(
            state.selectedCoordinate,
            state.cityes,
            state.city,
            refs.podcastInfo
        );
    }
};

const selectCoordinateClick = (e) => {
    if (e.target.tagName === "INPUT") {
        state.selectedCoordinate = e.target.id;
        localStorage.saveState({ selectedCoordinate: e.target.id });

        showPodcast();
    }
};

const tabButtonClick = (e) => {
    const isOneDay = e.target.dataset.time === "now" ? true : false;
    state.isOneDay = isOneDay;

    turnTabButton();
    showPodcast();
    localStorage.saveState({ isOneDay });
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
    const searchText = refs.searchCity.value.trim();
    searchCity(searchText.replace(/[{}[\]\%/\\&\?\,\'\;:+!@#\$\^*)(]/g, ""));
};

const searchCity = (searchRequest) => {
    if (searchRequest === "") {
        noteify("Введіть назву міста");
        refs.searchCity.value = "";
        return;
    }

    refs.searchCity.value = searchRequest;

    fetchcityInfo(searchRequest)
        .then((data) => {
            if (data.length === 0) {
                noteify("Такого міста не знайдено");
                return;
            }

            state.cityes = data.map((city) => ({
                area: city.state,
                country: COUNTRY_NAME[city.country],
                name: city?.local_names?.uk ?? city.name,
                lat: city.lat,
                lon: city.lon,
            }));

            const weatherdata = data[0];

            state.city = searchRequest;
            state.selectedCoordinate = weatherdata.lat + "/" + weatherdata.lon;
            localStorage.saveState({
                cityes: state.cityes,
                city: state.city,
                selectedCoordinate: state.selectedCoordinate,
            });
            saveStore(searchRequest);

            render.listCityes(state.cityes, state.city, refs.cityesInfo);
            showPodcast();
        })
        .catch((error) => {
            if (error == "Error: 404") {
                render.widgetErorr("Вибачте сталася помилка сервера 404!");

                return console.log("Oops");
            }
            render.widgetErorr("Вибачте сталася помилка!");
            console.log(error);
        });
};

const startRadioSelected = (coordinate) => {
    const radioButtons = refs.cityesInfo.querySelectorAll(".custom-radio");
    if (!coordinate) {
        return;
    }
    if (radioButtons.length > 0) {
        [...radioButtons].find(
            (button) => button.id === coordinate
        ).checked = true;
    }

    state.store = cookie.getCookiesStore();
    refs.searchCity.value = state.city;

    turnTabButton();
    showPodcast();

    render.listStore(state.store, refs.listStore);
};

const saveStore = (name) => {
    if (state.store.some((item) => item === name)) return;

    state.store.push(name);

    if (state.store.length > 5) {
        cookie.removeCookieStore(state.store[0]);
        state.store.splice(0, 1);
    }

    cookie.addCookieStore(name);

    render.listStore(state.store, refs.listStore);
};

const selectItemStore = (name) => {
    refs.searchCity.value = name;
    searchCity(name);
};

const removeItemStore = (name) => {
    state.store = state.store.filter((item) => item !== name);
    render.listStore(state.store, refs.listStore);
    cookie.removeCookieStore(name);
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
refs.cityesInfo.addEventListener("click", selectCoordinateClick);
refs.listStore.addEventListener("click", clickItemStore);

Object.assign(state, localStorage.getState());

render.listCityes(state.cityes, state.city, refs.cityesInfo);
startRadioSelected(state.selectedCoordinate);
