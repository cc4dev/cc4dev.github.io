const backgroundImageText = document.getElementById("background-image-text");
const lofiMode = document.getElementById("lofi-mode");
const themeRandomButton = document.getElementById("random-theme-button");
const darkThemeList  = ["mocha", "base16-dark", "gruvbox-dark", "windows-95", "tokyo-night-dark"];
const lightThemeList = ["base16-light", "gruvbox-light", "windows-95-light", "tokyo-night-light"];
const themeList = darkThemeList.concat(lightThemeList);

function createThemeList(themeList, containerId)
{
    const container = document.getElementById(containerId);
    themeList.forEach((theme, themeCount) => {
        const link = document.createElement("a");
        link.href = "";
        link.textContent = theme;

        if (localStorage.getItem("isTheme") === theme) link.style.color = "var(--hover)";

        link.addEventListener("click", (event) => {
            event.preventDefault();
            localStorage.setItem("isTheme", theme);
            window.location.href = link.href;
        });

        const listItem = document.createElement("li");
        listItem.style.display = "inline";
        listItem.appendChild(link);
        container.appendChild(listItem);

        if (themeCount < themeList.length - 1)
        {
            const comma = document.createTextNode(", ");
            container.appendChild(comma);
        }
    });
}

createThemeList(darkThemeList, 'dark-theme-list');
createThemeList(lightThemeList, 'light-theme-list');

themeRandomButton.addEventListener("click", () => {
    const randomTheme = themeList[Math.floor(Math.random() * themeList.length)];
    localStorage.setItem("isTheme", randomTheme);
    window.location.href = themeRandomButton.href;
});

backgroundImageText.textContent = localStorage.getItem("isAnimatedBackground");
backgroundImageText.addEventListener("click", () => {
    const oldSettings = localStorage.getItem("isAnimatedBackground");
    if (oldSettings === "No") localStorage.setItem("isAnimatedBackground", "Yes");
    else localStorage.setItem("isAnimatedBackground", "No");
    backgroundImageText.textContent = localStorage.getItem("isAnimatedBackground");
});

lofiMode.addEventListener("click", () => {
    var element = document.getElementsByClassName("page");
    for (var i = 0;i < element.length;++i) element[i].style.display = "none";
    document.body.style.overflow = "hidden";
    const music = new Audio("/assets/i-need-a-girl-by-lee.mp3").play();
    music.loop = true;
});