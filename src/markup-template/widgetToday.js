export const widgetToday = (data) => `
<div class="widget-now">
<div class="widget-now__layout">
    <div>
        <h2 class="widget-now__title">
            ${data.sity}, ${data.nameCountry}
            ${data.state ? "(" + data.state + ")" : ""}
        </h2>

        <div class="widget-now__date">
            ${data.date}
        </div>
    </div>
</div>

<div class="widget-now__weather-info">
    <div class="widget-now__box-image">
        <img
            src="//openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${
                data.icon
            }.png"
            width="128"
            height="128"
            alt="Weather in ${data.sity}, UA"
            class="widget-now__image"
        />
        <p
            class="widget-now__image-description"
        >
        ${data.description}
        </p>
    </div>

    <div class="widget-now__temperature">
        ${data.temp.toFixed()}°C
    </div>
    <div class="widget-now__detail">
        <div class="widget-now__detail-title">
            Деталі
        </div>
        <div class="widget-now__detail-info">
            <div
                class="widget-now__detail-box-name"
            >
                <p
                    class="widget-now__detail-name"
                >
                    Відчувається
                </p>
                <p
                    class="widget-now__detail-name"
                >
                    Вітер
                </p>
                <p
                    class="widget-now__detail-name"
                >
                    Вологість
                </p>
                <p
                    class="widget-now__detail-name"
                >
                    Опади
                </p>
                <p
                    class="widget-now__detail-name"
                >
                    Тиск
                </p>
            </div>
            <div
                class="widget-now__detail-box-value"
            >
                <p
                    class="widget-now__detail-value"
                >
                    ${data.FeelsLike.toFixed()}°C
                </p>
                <p
                    class="widget-now__detail-value"
                >
                    ${data.windSpead} m/s
                </p>
                <p
                    class="widget-now__detail-value"
                >
                    ${data.humidity}%
                </p>
                <p
                    class="widget-now__detail-value"
                >
                   ${data.main ?? "-"}
                </p>
                <p
                    class="widget-now__detail-value"
                >
                    ${(data.pressure * 0, 75).toFixed(1)} мм.рт.ст.
                </p>
            </div>
        </div>
    </div>
</div>
<div class="widget-now__compas-box">
    <div class="widget-now__compas">
        <img
            src="./images/compas.png"
            width="128"
            height="128"
            alt="Weather in Odesa, UA"
            class="widget-now__image-compas"
        />
        <img
            src="./images/arrow.png"
            width="90"
            height="90"
            alt="Weather in Odesa, UA"
            class="widget-now__image-arrow"
            style="transform: translate(-50%, -50%)rotate(${
                data.windDeg - 43
            }deg);"
        />
    </div>
    <p class="widget-now__image-description">
        ${data.windWay}
    </p>
</div>
</div>
`;
