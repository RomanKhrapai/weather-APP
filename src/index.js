import { fetchSityInfo } from "./api.js";

import { COUNTRY_NAME } from "./defaultValue.js";

import { renderPodcasttoday } from "./render/renderPodcasttoday.js";
import { renderListSityes } from "./render/renderListSityes.js";
import { renderWidgetErorr } from "./render/renderWidgetErorr.js";
import { renderLoader } from "./render/renderLoader.js";
import { saveState } from "./localStorege/saveState.js";
import { getState } from "./localStorege/getstate.js";

const refs = {
    tabs: document.querySelector(".tab-buttons"),
    textSearch: document.querySelector(".form__input"),
    buttonSearch: document.querySelector(".form__search-button"),
    sityesinfo: document.getElementById("show-land"),
    podcastInfo: document.querySelector(".tab-contents"),
};

const state = {
    selectedCoordinate: null,
    isOneDay: true,
    sity: "",
    sityes: [],
};

const showPodcast = () => {
    if (state.isOneDay) {
        renderPodcasttoday(
            state.selectedCoordinate,
            state.sityes,
            refs.podcastInfo
        );
        return;
    }
};

const selectCoordinateClick = (e) => {
    if (e.target.tagName === "INPUT") {
        state.selectedCoordinate = e.target.id;
        saveState({ selectedCoordinate: e.target.id });
        if (state.isOneDay) {
            renderLoader(refs.podcastInfo);
            showPodcast();
        }
    }
};

const tabButtonClick = (e) => {
    const buttons = [...e.currentTarget.children];
    buttons.forEach((button) => {
        button.classList.remove("tab-button-active");
    });

    e.target.classList.add("tab-button-active");
};

const searchSity = (e) => {
    event.preventDefault();
    const searchRequest = refs.textSearch.value.trim();
    if (searchRequest !== "") {
        fetchSityInfo(searchRequest)
            .then((data) => {
                console.log(data);
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
                renderLoader(refs.podcastInfo);
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

    [...radioButtons].find((button) => button.id === coordinate).checked = true;

    showPodcast();
};

refs.tabs.addEventListener("click", tabButtonClick);
refs.buttonSearch.addEventListener("click", searchSity);
refs.sityesinfo.addEventListener("click", selectCoordinateClick);

Object.assign(state, getState());

renderListSityes(state.sityes, state.sity, refs.sityesinfo);
renderLoader(refs.podcastInfo);
startRadioSelected(state.selectedCoordinate);
