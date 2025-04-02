const AUTHOR = "cc4dev";
const REPOSITORY = "cc4dev.github.io"
const indexZ = document.getElementById("indexZ-content");

if (!localStorage.getItem("latestCommitDate"))
{
    localStorage.setItem("latestCommitDate", "2023-06-01T01:01:01Z");
}

if (!localStorage.getItem("latestCommitMessage"))
{
    localStorage.setItem("latestCommitMessage", "Minor fixes");
}

function convertISO(DATE)
{
    const monthInText = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(DATE);

    const day = date.getDate().toString().padStart(2, '0');
    const month = monthInText[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

const commitMessage = localStorage.getItem("latestCommitMessage");
const commitSince = localStorage.getItem("latestCommitDate");
const commitDate = convertISO(commitSince);

async function getCommit()
{
    const URL = `https://api.github.com/repos/${AUTHOR}/${REPOSITORY}/commits?per_page=1`;
    console.log(URL);
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
indexZ.innerHTML +=
`<text>
    <span style="color: var(--off-fg);">Date:</span> ${commitDate}.
</text>
<br/>
<text>
    <span style="color: var(--off-fg);">Message:</span> ${commitMessage}.
</text>`;