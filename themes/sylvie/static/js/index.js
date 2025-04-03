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
        document.body.style.backgroundImage = `url('${window.location.origin}/assets/animated-background.webp')`;
    }
    else
    {
        document.body.style.backgroundImage = `url('${window.location.origin}/assets/background.webp`;
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

animatedBackgroundLoad();
themeLoad();

const welcomeText = [
    "Xin chào",
    "Hello",
    "Hola",
    "Bonjour",
    "Hallo",
    "Ciao",
    "Olá",
    "Привет",
    "こんにちは",
    "안녕하세요",
    "你好",
    "مرحبا",
    "नमस्ते",
    "สวัสดี",
    "Salam",
    "Merhaba",
    "Sawubona",
    "Habari",
    "Shalom",
    "Hej"
];

//console.log(window.location.href);

if (window.location.href === "https://cc4dev.github.io/" || window.location.href === "http://localhost:1313/")
{
    document.getElementById("welcomeTextBody").innerText = welcomeText[0] + "! ";

    var pos = 0, i = 1;

    function welcomeTextAnimation()
    {
        setInterval(function() {
            pos = i % 20;
            //console.log(pos, welcomeText[pos]);
            document.getElementById("welcomeTextBody").innerText = `${welcomeText[pos]}\! `;
            i++;
        }, 1500)
    }

    welcomeTextAnimation();
}