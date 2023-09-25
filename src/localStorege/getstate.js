export const getState = () => {
    const selectedCoordinate =
        localStorage.getItem("selectedCoordinate") ?? null;
    const isOneDay = localStorage.getItem("isOneDay") ?? true;
    const sity = localStorage.getItem("sity") ?? "";
    const sityes = JSON.parse(localStorage.getItem("sityes")) ?? [];
    
    return { selectedCoordinate, isOneDay, sity, sityes };
};
