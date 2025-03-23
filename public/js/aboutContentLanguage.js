if (!localStorage.getItem("aboutContentlanguage"))
{
    localStorage.setItem("aboutContentlanguage", "ENG");
}

const lang = localStorage.getItem("aboutContentlanguage");
const opositeLang = lang === "ENG" ? "VIE" : "ENG";

document.getElementById(`about-content-${lang}`).style.display = "block";
document.getElementById(`${lang}`).style.color = "var(--hover)";
document.getElementById(`about-content-${opositeLang}`).style.display = "none";

document.querySelectorAll(".about-content-language").forEach(element => {
    element.addEventListener("click", function() {
        const lang = this.id;
        localStorage.setItem("aboutContentlanguage", lang);
    });
});
