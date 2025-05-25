// 88x31 buttons
document.getElementById("indexZ-button-secret").addEventListener("click", () => {
    window.open("/assets/secret.webp", '_blank').focus();
});
document.getElementById("indexZ-button-ncs").addEventListener("click", () => {
    window.open("https://www.youtube.com/playlist?list=PLRBp0Fe2Gpgn8Y9qI-p0aTxVtw8onBSFj", '_blank').focus();
});

// Welcome Text
const indexZ_welcomeList = [
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
document.getElementById("indexZ-welcome-text").innerText = indexZ_welcomeList[0] + "! 👋";
var indexZ_welcomeList_pos = 0, indexZ_welcomeList_i = 1;

function indexZ_welcomeTextAnimation()
{
    setInterval(function() {
        indexZ_welcomeList_pos = indexZ_welcomeList_i % 20;
        //console.log(indexZ_welcomeList_pos, indexZ_welcomeList[indexZ_welcomeList_pos]);
        document.getElementById("indexZ-welcome-text").innerText = `${indexZ_welcomeList[indexZ_welcomeList_pos]}\! 👋`;
        indexZ_welcomeList_i++;
    }, 1500)
}
indexZ_welcomeTextAnimation();

// Commit information
const AUTHOR = "takai24";
const REPOSITORY = "takai24.github.io"
const indexZ_commit = document.getElementById("indexZ-commit");

if (!localStorage.getItem("latestCommitDate"))
{
    localStorage.setItem("latestCommitDate", "2023-06-01T01:01:01Z");
}
if (!localStorage.getItem("latestCommitMessage"))
{
    localStorage.setItem("latestCommitMessage", "Minor fixes");
}

const commitMessage = localStorage.getItem("latestCommitMessage");
const commitSince = localStorage.getItem("latestCommitDate");
const commitDate = convertISO(commitSince);

function convertISO(DATE)
{
    const monthInText = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(DATE);

    const day = date.getDate().toString().padStart(2, '0');
    const month = monthInText[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

async function getCommit()
{
    const URL = `https://api.github.com/repos/${AUTHOR}/${REPOSITORY}/commits?per_page=1`;

    try
    {
        const response = await fetch(URL);
        if (!response.ok)
        {
            throw new Error(`Error. Status: ${response.status}`);
        }

        const commits = await response.json();
        if (commits.length > 0)
        {
            const latestCommit = commits[0];

            /*console.log("Latest Commit:");
            console.log(`Author: ${latestCommit.commit.author.name}`);
            console.log(`Message: ${latestCommit.commit.message}`);
            console.log(`Date: ${latestCommit.commit.author.date}`);
            console.log(`URL: ${latestCommit.html_url}`);*/

            localStorage.setItem("latestCommitDate", latestCommit.commit.author.date);
            localStorage.setItem("latestCommitMessage", latestCommit.commit.message);

            if (latestCommit.commit.message == ".") localStorage.setItem("latestCommitMessage", "Minor fixes");
        }
        else console.log("No commits found in this repository.");
    }
    catch (error)
    {
        console.error("Error: ", error);
    }
}

getCommit();
indexZ_commit.innerHTML +=
`<text>
    <span style="color: var(--off-fg);">Date:</span> ${commitDate}.
</text>
<br/>
<text>
    <span style="color: var(--off-fg);">Message:</span> ${commitMessage}.
</text>`;