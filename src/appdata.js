const AppName = "Tasks";
const setTitle = (...titles) => {
    document.title = (titles.length ? titles.join(' • ') + ' • ' : '') + AppName;
};

export {
    AppName,
    setTitle,
};