const userID = 72246940;

async function getUserRepositoryInfo()
{
    try
    {
        const response = await fetch(`https://api.github.com/user/${userID}/repos`);
        const data = await response.json();
        //console.log(data);

        const lang = {};
        let totalByte = 0;

        for (const repo in data)
        {
            const newData = await fetch(data[repo].languages_url);
            const langData = await newData.json();
            //console.log(langData);
            for (const [key, value] of Object.entries(langData))
            {
                if (key === "Dockerfile" || key === "Nix" || key === "Shell") continue;
                if (lang[key] === undefined) lang[key] = value;
                else lang[key] += value;
                totalByte += value;
            }
        }

        lang = Object.entries(lang)
        .sort((a, b) => b[1] - a[1])
        .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});

        console.log(totalByte);
        console.log(lang);
    }
    catch (error)
    {
        console.error(error.message);
    }
}
