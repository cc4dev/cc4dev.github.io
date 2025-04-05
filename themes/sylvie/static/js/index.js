function themeLoad()
{
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = `${window.location.origin}/css/palettes/${localStorage.getItem("isTheme")}.css`;
    document.head.appendChild(link);
}
function animatedBackgroundLoad()
{
    if (localStorage.getItem("isAnimatedBackground") === "Yes")
    {
        document.querySelector("main").style.backgroundImage = `url('${window.location.origin}/assets/animated-background.webp')`;
    }
    else
    {
        document.querySelector("main").style.backgroundImage  = `url('${window.location.origin}/assets/background.webp`;
    }
}

if (!localStorage.getItem("isAnimatedBackground"))
{
    localStorage.setItem("isAnimatedBackground", "No");
}
if (!localStorage.getItem("isTheme") || localStorage.getItem("isTheme") === "Dark" || localStorage.getItem("isTheme") === "Light")
{
    localStorage.setItem("isTheme", "mocha");
}
if (localStorage.getItem("isBackgroundImage"))
{
    localStorage.removeItem("isBackgroundImage");
}

animatedBackgroundLoad();
themeLoad();

document.getElementById("page-hidden").style.display = "none";
document.getElementById("page-header-x").addEventListener("click", () => {
    var element = document.getElementsByClassName("page");
    for (var i = 0;i < element.length;++i) element[i].style.display = "none";
    document.getElementById("page-hidden").style.display = "flex";
});
document.getElementById("page-hidden").addEventListener("click", () => {
    var element = document.getElementsByClassName("page");
    for (var i = 0;i < element.length;++i) element[i].style.display = "block";
    document.getElementById("page-hidden").style.display = "none";
});

/* Responsive when no JS */
document.querySelector("main").style.paddingTop = "0";