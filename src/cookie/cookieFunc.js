export const getCookiesStore = () =>
    document.cookie
        .split("; ")
        .filter((item) => item.split("!-")[0] === "store")
        .map((item) => item.split("=")[1]);

export const addCookieStore = (name) => {
    const indexStore = document.cookie.split("; ").reduce((index, item) => {
        const arr = item.split("!-");

        if (arr[0] !== "store") return index;

        return +arr[1].split("")[0] === index ? index + 1 : index;
    }, 1);

    document.cookie = `store!-${indexStore}=${name}; secure; max-age=604800`;
};

export const removeCookieStore = (name) => {
    document.cookie.split("; ").forEach((item) => {
        const arr = item.split("=");

        if (arr[1] === name)
            document.cookie = `${arr[0]}=${name}; secure; max-age=-1`;
    });
};
