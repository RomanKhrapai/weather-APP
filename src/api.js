import { APPID } from "./defaultValue.js";
export function fetchSityInfo(name) {
    return fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${APPID}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
}
export function currentWeather(lat, lon) {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APPID}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
}

export function forcastFiveDay(lat, lon) {
    return fetch(
        `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APPID}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
}
