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
const AUTHOR = "cc4dev";
const REPOSITORY = "cc4dev.github.io"
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

const youtubeLinks = [
    ["God knows... ''The Melancholy of Haruhi Suzumiya'' 【涼宮ハルヒの憂鬱】Kadokawa公認MAD【ﾍﾞｰｽ 演奏】", "https://www.youtube.com/watch?v=WWB01IuMvzA"],
    ["Most Popular Songs by Andora | Non-stop Mini Playlist HQ Audio", "https://www.youtube.com/watch?v=742pF4nbgb4"],
    ["Alohaii - SUMMERTIDE [Full Album]", "https://www.youtube.com/watch?v=jiiI6mygFTo"],
    ["「ＭＶ」　千本桜　WhiteFlame feat 初音ミク", "https://www.youtube.com/watch?v=shs0rAiwsGQ"],
    ["Nightcore - Highscore", "https://www.youtube.com/watch?v=ptSvxHO9kBc"],
    ["Enormous P3nis", "https://www.youtube.com/watch?v=EWMPVn1kgIQ"],
    ["Ryuichi Sakamoto - Merry Christmas, Mr. Lawrence", "https://www.youtube.com/watch?v=1OZDaRhHHyM"],
    ["【東方】Bad Apple!! ＰＶ【影絵】", "https://www.youtube.com/watch?v=FtutLA63Cp8"],
    ["Xomu - Lanterns", "https://www.youtube.com/watch?v=L17njonbcT0"],
    ["Spring Butterfly by Ho Quang Hieu | Official MV", "https://www.youtube.com/watch?v=-41E5B85rTI"]
];
const indexZ_youtube = document.getElementById("indexZ-youtube");

const date = new Date();
const linkPos = date.getDay() % 10;
const chosenLink = youtubeLinks[linkPos][1];
const chosenTitle = youtubeLinks[linkPos][0];
var videoId = "";

for (var i = chosenLink.length - 1;i != 0;i -= 1)
{
    if (chosenLink[i] != "=") videoId += chosenLink[i];
    else break;
}

videoId = videoId.split("").reverse().join("");

//console.log(videoId);

indexZ_youtube.innerHTML =
`<p> -> <a href="${chosenLink}">${chosenTitle}</a></p>
`;