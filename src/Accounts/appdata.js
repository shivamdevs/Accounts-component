const AppName = "Accounts";
const setTitle = (...titles) => {
    document.title = (titles.length ? titles.join(' • ') + ' • ' : '') + AppName;
};
const getCoverArt = () => {
    var coverArt = Math.floor(Math.random() * 10);
    if (window.sessionStorage) {
        if (window.sessionStorage.getItem("accounts:coverart") !== null) {
            coverArt = window.sessionStorage.getItem("accounts:coverart");
        } else {
            window.sessionStorage.setItem("accounts:coverart", coverArt);
        }
    }
    return AssetPath + "coverarts/o-" + coverArt + ".jpg";
};
export const AssetPath = "https://assets.myoasis.tech/accounts/";
export {
    AppName,
    setTitle,
    getCoverArt,
};