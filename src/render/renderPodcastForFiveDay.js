import { fetchForcastFiveDay } from "../api.js";
import { widgetForFiveDay } from "../markup-template/widgetForFiveDay.js";
import { COUNTRY_NAME } from "../defaultValue.js";
import { windWay, formatDate } from "../help.js";
import { renderWidgetErorr } from "./renderWidgetErorr.js";
import { widgetWeatherInfo } from "./widgetWeatherInfo.js";
import { calendarDay } from "../markup-template/calendarDay.js";

export const renderPodcastForFiveDay = (coordinate, sityes, ref) => {
    if (coordinate) {
        const coordinateArray = coordinate.split("/");

        fetchForcastFiveDay(coordinateArray[0], coordinateArray[1])
            .then((data) => {
                console.log(data);

                const chooseSity = sityes.find(
                    (sity) => sity.lat + "/" + sity.lon === coordinate
                );
                console.log(ref);
                if (chooseSity) {
                    ref.innerHTML = widgetForFiveDay({
                        sity: chooseSity.localName,
                        state: chooseSity.area,
                    });
                    widgetWeatherInfo(ref.querySelector(".widget__info-box"), {
                        date: formatDate(data.list[0].dt)[1],
                        icon: data.list[0].weather[0].icon,
                        description: data.list[0].weather[0].description,
                        temp: data.list[0].main.temp,
                        FeelsLike: data.list[0].main.feels_like,
                        pressure: data.list[0].main.pressure,
                        humidity: data.list[0].main.humidity,
                        windSpead: data.list[0].wind.speed,
                        windDeg: data.list[0].wind.deg,
                        main: data.list[0].weather.main,
                        windWay: windWay(data.list[0].wind.deg),
                    });
                    console.log(ref.querySelector(".widget__calendar"));
                    calendarDay(
                        ref.querySelector(".widget__calendar"),
                        data.list
                            .filter(
                                (item) =>
                                    new Date(item.dt * 1000).getHours() === 12
                            )
                            .map((item) => ({
                                ...item,
                                date: formatDate(item.dt)[2],
                            }))
                    );
                }
            })

            .catch((error) => {
                if (error == "Error: 404") {
                    renderWidgetErorr("Вибачте сталася помилка сервера 404!");
                    return console.log("Oops");
                }
                // renderWidgetErorr("Вибачте сталася помилка!");

                console.log(error);
            });
    }
};
