export const saveState = (state) => {
    const { sity, selectedCoordinate, isOneDay = true, sityes } = state;

    if (sity) {
        localStorage.setItem("sity", sity);
    }
    if (selectedCoordinate) {
        localStorage.setItem("selectedCoordinate", selectedCoordinate);
    }

    localStorage.setItem("isOneDay", isOneDay);

    if (sityes) {
        localStorage.setItem("sityes", JSON.stringify(sityes));
    }
};
