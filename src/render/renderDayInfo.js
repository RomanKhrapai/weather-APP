import { widgetWeatherInfo } from "./widgetWeatherInfo.js";
import { formatDate, windWay } from "../help.js";

export const renderDayInfo = (weatherInfo) => {
    return widgetWeatherInfo({
        time: formatDate(weatherInfo.dt)[3],
        icon: weatherInfo.weather[0].icon,
        description: weatherInfo.weather[0].description,
        temp: weatherInfo.main.temp,
        FeelsLike: weatherInfo.main.feels_like,
        pressure: weatherInfo.main.pressure,
        humidity: weatherInfo.main.humidity,
        windSpead: weatherInfo.wind.speed,
        windDeg: weatherInfo.wind.deg,
        main: weatherInfo.weather.main,
        windWay: windWay(weatherInfo.wind.deg),
    });
};
