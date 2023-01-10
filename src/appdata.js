const AppName = "Accounts";
const setTitle = (...titles) => {
    document.title = (titles.length ? titles.join(' • ') + ' • ' : '') + AppName;
};

const getCoverArt = () => {
    const coverLength = 10;
    let coverArt = Math.floor(Math.random() * coverLength);

    if (window.sessionStorage) {
        if (window.sessionStorage.getItem("--cover-art") !== null) {
            coverArt = window.sessionStorage.getItem("--cover-art");
        } else {
            window.sessionStorage.setItem("--cover-art", coverArt);
        }
    }
    return coverArt;
};

export {
    AppName,
    setTitle,
    getCoverArt,
};