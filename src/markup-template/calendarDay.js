export const calendarDay = (ref, list) => {
    console.log(list);
    ref.innerHTML =
        '<div class="calendar"> <ul class="calendar__list">' +
        list
            .map(
                (elem) => `
            <li class="calendar__item">
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
                <button class="calendar__button-spred">
                    <svg class="calendar__icon-spred">
                        <use xlink:href="#icon-circle-up"></use>
                        <symbol id="icon-circle-up" viewBox="0 0 32 32">
                            <path
                                d="M22.086 20.914l2.829-2.829-8.914-8.914-8.914 8.914 2.828 2.828 6.086-6.086z"
                            ></path>
                        </symbol>
                    </svg>
                </button>
            </li>`
            )
            .join("") +
        "</ul></div>";
};
