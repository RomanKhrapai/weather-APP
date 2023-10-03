import { fetchCurrentWeather } from "../api.js";
import { widgetToday } from "../markup-template/widgetToday.js";
import { COUNTRY_NAME } from "../defaultValue.js";
import { windWay, formatDate } from "../help.js";
import { widgetErorr } from "./widgetErorr.js";

export const podcasttoday = (coordinate, cityes, name, ref) => {
    if (coordinate) {
        const coordinateArray = coordinate.split("/");

        fetchCurrentWeather(coordinateArray[0], coordinateArray[1])
            .then((data) => {
                const choosecity = cityes.find(
                    (city) => city.lat + "/" + city.lon === coordinate
                );

                ref.innerHTML = widgetToday({
                    icon: data.weather[0].icon,
                    description: data.weather[0].description,
                    city: choosecity?.name ?? name,
                    nameCountry: COUNTRY_NAME[data.sys.country],
                    state: choosecity?.area ?? "",
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
                    widgetErorr("Вибачте сталася помилка сервера 404!");
                    return console.log("Oops");
                }
                widgetErorr("Вибачте сталася помилка!");
                console.log(error);
            });
    }
};
