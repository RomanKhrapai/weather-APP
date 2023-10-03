export const widgetWeatherInfo = (data) => {
    const title = data.date
        ? `<p class="widget__title-date "> ${data.date}</p>`
        : `<p class="widget__title-time "> Погода детальніше</p>`;

    return `
   ${title} 
    <div class="widget__info" data-widget-info>
        <div class="widget__box-image">
                <img
                    src="//openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${
                        data.icon
                    }.png"
                    width="100"
                    height="100"
                    alt="Погода у ${data.city}"
                    class="widget__image"
                />
                <p
                    class="widget__image-description"
                >
                ${data.description}
                </p>
        </div>

        <div class="widget__temperature-min">
        <span> ${data.temp.toFixed()}°C </span>
            <div class="widget__compas-box">
                <div class="widget__compas">
                    <img
                        src="src/images/compas.png"
                        width="70"
                        height="70"
                        alt="Weather in Odesa, UA"
                        class="widget__image-compas"
                    />
                    <img
                        src="src/images/arrow.png"
                        width="50"
                        height="50"
                        alt="Weather in Odesa, UA"
                        class="widget__image-arrow"
                        style="transform: translate(-50%, -56%)rotate(${
                            data.windDeg - 43
                        }deg);"
                    />
                </div>
                <p class="widget__wind-text">
                    ${data.windWay.min}
                </p>
            </div>
        </div>
        
        <div class="widget__detail">
            <div class="widget__detail-title">
                Деталі
            </div>
            <div class="widget__detail-info">
                <div class="widget__detail-box-name">
                    <p class="widget__detail-name"> Відчувається</p>
                    <p class="widget__detail-name">   Вітер </p>
                    <p class="widget__detail-name" >  Вологість </p>
                    <p   class="widget__detail-name" >  Опади </p>
                    <p    class="widget__detail-name" >    Тиск  </p>
                </div>
                <div  class="widget__detail-box-value"  >
                    <p  class="widget__detail-value">   ${data.FeelsLike.toFixed()}°C  </p>
                    <p  class="widget__detail-value"  >   ${
                        data.windSpead
                    } m/s </p>
                    <p  class="widget__detail-value"  >   ${data.humidity}% </p>
                    <p    class="widget__detail-value"  > ${
                        data.main ?? "-"
                    } </p>
                    <p  class="widget__detail-value" >   ${(data.pressure * 0,
                    75).toFixed(1)} мм.рт.ст.  </p>
                </div>
            </div>
        </div>   
    </div>`;
};
