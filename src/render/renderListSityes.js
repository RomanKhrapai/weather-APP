export const renderListSityes = (sityes, sity, ref) => {
    let str = "";
    
    sityes.forEach((elem, index) => {
        str += `<input type="radio" class="custom-radio" id="${elem.lat}/${
            elem.lon
        }" name="area" >
<label for="${elem.lat}/${elem.lon}">${elem.country} ${
            elem.area ? "(" + elem.area + ")" : ""
        }  </label>`;
    });

    ref.innerHTML = `<h2> Погода в місті "${sity}"</h2><form class='form-area'> ${str}</form>`;
};
