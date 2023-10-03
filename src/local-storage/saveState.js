export const saveState = (state) => {
    const { city, selectedCoordinate, isOneDay = true, cityes } = state;

    if (city) {
        localStorage.setItem("city", city);
    }
    if (selectedCoordinate) {
        localStorage.setItem("selectedCoordinate", selectedCoordinate);
    }

    localStorage.setItem("isOneDay", isOneDay);

    if (cityes) {
        localStorage.setItem("cityes", JSON.stringify(cityes));
    }
};
