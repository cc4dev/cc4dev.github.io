function themeLoad()
{
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = `${window.location.origin}/css/palettes/${localStorage.getItem("isTheme")}.css`;
    document.head.appendChild(link);
}

themeLoad();