import { fetchCurrentWeather } from "../api.js";
import { widgetToday } from "../markup-template/widgetToday.js";
import { COUNTRY_NAME } from "../defaultValue.js";
import { windWay, formatDate } from "../help.js";
import { renderWidgetErorr } from "./renderWidgetErorr.js";

export const renderPodcasttoday = (coordinate, sityes, name, ref) => {
    if (coordinate) {
        const coordinateArray = coordinate.split("/");

        fetchCurrentWeather(coordinateArray[0], coordinateArray[1])
            .then((data) => {
                const chooseSity = sityes.find(
                    (sity) => sity.lat + "/" + sity.lon === coordinate
                );

                ref.innerHTML = widgetToday({
                    icon: data.weather[0].icon,
                    description: data.weather[0].description,
                    sity: chooseSity?.name ?? name,
                    nameCountry: COUNTRY_NAME[data.sys.country],
                    state: chooseSity?.area ?? "",
                    date: formatDate(data.dt),
                    temp: data.main.temp,
                    FeelsLike: data.main.feels_like,
                    pressure: data.main.pressure,
                    humidity: data.main.humidity,
                    windSpead: data.wind.speed,
                    windDeg: data.wind.deg,
                    main: data.weather.main,
                    windWay: windWay(data.wind.deg),
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
