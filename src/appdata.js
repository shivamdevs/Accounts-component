import Cookies from "universal-cookie";

const cookie = new Cookies();

const AppName = "Tasks";
const setTitle = (...titles) => {
    document.title = (titles.length ? titles.join(' • ') + ' • ' : '') + AppName;
};

const getCoverArt = () => {
    const coverLength = 11;
    let coverArt = Math.floor(Math.random() * coverLength);

    const date = new Date();
    date.setDate(date.getDate() + 1); // 1 day

    if (cookie.get("--cover-art")) {
        coverArt = cookie.get("--cover-art");
    } else {
        cookie.set("--cover-art", coverArt, {
            path: "/auth",
            expires: date,
        });
    }
    return coverArt;
};

export {
    AppName,
    setTitle,
    getCoverArt,
};