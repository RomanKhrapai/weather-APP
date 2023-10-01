export const renderListSityes = (sityes, sity, ref) => {
    let str = "";
    if (sityes.length > 1) {
        sityes.forEach((elem, index) => {
            str += `<input type="radio" class="custom-radio" id="${elem.lat}/${
                elem.lon
            }" name="area" ${index === 0 ? "checked" : ""}>
<label for="${elem.lat}/${elem.lon}">${elem.country} ${
                elem.area ? "(" + elem.area + ")" : ""
            }  </label>`;
        });
    }

    ref.innerHTML = `<h2> Погода за запитом "${sity}"</h2><form class='form-area'> ${str}</form>`;
};
