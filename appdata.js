const __accounts_app_name = "Accounts";
const __accounts_set_title = (...titles) => {
    document.title = (titles.length ? titles.join(' • ') + ' • ' : '') + __accounts_app_name;
};
const __accounts_get_cover_art = () => {
    var coverArt = Math.floor(Math.random() * 10);
    if (window.sessionStorage) {
        if (window.sessionStorage.getItem("accounts:coverart") !== null) {
            coverArt = window.sessionStorage.getItem("accounts:coverart");
        } else {
            window.sessionStorage.setItem("accounts:coverart", coverArt);
        }
    }
    return __accounts_asset_path + "coverarts/o-" + coverArt + ".jpg";
};
const __accounts_asset_path = "https://assets.myoasis.tech/accounts/";
export {
    __accounts_app_name,
    __accounts_set_title,
    __accounts_asset_path,
    __accounts_get_cover_art,
};