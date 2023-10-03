export const getState = () => {
    const selectedCoordinate =
        localStorage.getItem("selectedCoordinate") ?? null;

    const isOneDay = JSON.parse(localStorage.getItem("isOneDay")) ?? true;

    const city = localStorage.getItem("city") ?? "";

    const cityes = JSON.parse(localStorage.getItem("cityes")) ?? [];

    return { selectedCoordinate, isOneDay, city, cityes };
};
