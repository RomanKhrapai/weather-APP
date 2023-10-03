export const listCityes = (cityes, city, ref) => {
    let str = "";
    if (cityes.length > 1) {
        cityes.forEach((elem, index) => {
            str += `<input type="radio" class="custom-radio" id="${elem.lat}/${
                elem.lon
            }" name="area" ${index === 0 ? "checked" : ""}>
<label for="${elem.lat}/${elem.lon}">${elem.country} ${
                elem.area ? "(" + elem.area + ")" : ""
            }  </label>`;
        });
    }

    if (city.trim() === "") {
        ref.innerHTML = `<h2> Введіть назву міста</h2>`;
        return;
    }
    ref.innerHTML = `<h2> Погода за запитом "${city}"</h2><form class='form-area'> ${str}</form>`;
};
