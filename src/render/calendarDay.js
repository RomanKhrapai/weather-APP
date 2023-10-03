import { dayInfo } from "./dayInfo.js";
export const calendarDay = (ref, list) => {
    ref.innerHTML =
        '<div class="calendar"> <ul class="calendar__list">' +
        list
            .map(
                (elem, index) => `
            <li class="calendar__list-item">
            <div class="widget__info-day" >${dayInfo(elem)}</div> 
              <div class="calendar__item" data-name="item-day" data-index="${
                  elem.dt
              }">
                <p class="calendar__title"> ${elem.date}</p>
                <div class="calendar__image-box">
                    <img
                    src="//openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${
                        elem.weather[0].icon
                    }.png"
                    width="75"
                    height="75"
                    alt=" ${elem.weather[0].description}"
                    class="calendar__image"
                    />
                <p class="calendar__image-description">
                ${elem.weather[0].description}
                </p>
            </div>
          
            <div class="calendar__temp">
            <span class="calendar__temp-text">${elem.main.temp.toFixed()}°C</span></div>
                </div>
            </li>`
            )
            .join("") +
        "</ul></div>";
};
