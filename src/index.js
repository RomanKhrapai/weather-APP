import { fetchSityInfo } from "./api.js";
import { COUNTRY_NAME } from "./defaultValue.js";
const ref = {
    tabs: document.querySelector(".tab-buttons"),
    textSearch: document.querySelector(".form__input"),
    buttonSearch: document.querySelector(".form__search-button"),
    sityesinfo: document.getElementById("show-land"),
};

const watchListSity = (sityes) => {
    console.log(sityes);
    let str = "";
    sityes.forEach((elem, index) => {
        str += `<input type="radio" class="custom-radio" id="sity-${index}" name="area" >
<label for="sity-${index}">${COUNTRY_NAME[elem.country]} (${
            elem.state
        })  </label>`;
    });
    ref.sityesinfo.innerHTML = `<form class='form-area'> ${str}</form>`;
};

const tabButtonClick = (e) => {
    const buttons = [...e.currentTarget.children];
    buttons.forEach((button) => {
        button.classList.remove("tab-button-active");
    });

    e.target.classList.add("tab-button-active");
};
const searchSity = (e) => {
    event.preventDefault();
    const searchRequest = ref.textSearch.value.trim();
    if (searchRequest !== "") {
        fetchSityInfo(searchRequest)
            .then((data) => {
                console.log(JSON.stringify(data));

                if (data.length === 1) {
                    console.log(...data);
                    // watchSity(...data)
                } else {
                    console.log(data);
                    watchListSity(data);
                }
            })
            .catch((error) => {
                if (error == "Error: 404") {
                    //  writeList('');
                    // writeBoxContry('');
                    return console.log(
                        "Oops, there is no country with that name"
                    );
                }
                console.log(error);
            });
    }
};
console.log(ref.buttonSearch);
ref.tabs.addEventListener("click", tabButtonClick);
ref.buttonSearch.addEventListener("click", searchSity);

watchListSity([
    {
        name: "Odesa",
        local_names: {
            nl: "Odessa",
            fr: "Odessa",
            fi: "Odessa",
            sr: "Одеса",
            it: "Odessa",
            zh: "敖德萨",
            et: "Odessa",
            hi: "ओदॆस",
            uk: "Одеса",
            en: "Odesa",
            io: "Odessa",
            oc: "Odesa",
            ro: "Odesa",
            nn: "Odessa",
            sk: "Odesa",
            es: "Odesa",
            sl: "Odesa",
            de: "Odessa",
            ru: "Одесса",
            sv: "Odesa",
            ka: "ოდესა",
            yi: "אדעס",
            ko: "오데사",
            hy: "Օդեսա",
            ja: "オデッサ",
            eo: "Odeso",
            hr: "Odesa",
            ur: "اودیسا",
            no: "Odessa",
            cs: "Oděsa",
            pt: "Odessa",
            lt: "Odessa",
            ca: "Odessa",
            hu: "Odessza",
            fa: "اودسا",
            ar: "أوديسا",
            ml: "ഒഡെസ",
            be: "Адэса",
            ku: "Odêsa",
            el: "Οδησσός",
            he: "אודסה",
            kn: "ಓದೆಸ",
            pl: "Odessa",
        },
        lat: 46.4843023,
        lon: 30.7322878,
        country: "UA",
        state: "Odesa Oblast",
    },
    {
        name: "Odessa",
        local_names: { en: "Odessa", ru: "Одесса", uk: "Одеса" },
        lat: 31.8457149,
        lon: -102.367687,
        country: "US",
        state: "Texas",
    },
    {
        name: "Odessa",
        local_names: { en: "Odessa", es: "Odessa", lt: "Odesa", uk: "Одеса" },
        lat: 39.457334,
        lon: -75.6613184,
        country: "US",
        state: "Delaware",
    },
    {
        name: "Odesa",
        local_names: { lt: "Odesa", uk: "Одеса" },
        lat: 54.5041704,
        lon: 24.8199741,
        country: "LT",
        state: "Vilnius County",
    },
]);
