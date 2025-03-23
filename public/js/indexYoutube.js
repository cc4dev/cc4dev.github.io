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
const indexYoutube = document.getElementById("indexYoutube-content");

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

console.log(videoId);

function fetchYouTubeData()
{
    const title = chosenTitle;
    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    console.log("Link: ", chosenLink);
    console.log("Title: ", title);
    console.log("Thumbnail URL: ", thumbnail);

    indexYoutube.innerHTML =
    `<p><a href="${chosenLink}">${chosenTitle}</a></p>
    `;
}

fetchYouTubeData();