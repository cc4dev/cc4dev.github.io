const dayForecast = 1;

const getInput = document.getElementById("weather-input");
const getSubmit = document.getElementById("weather-submit");
const getResult = document.getElementById("weather-result");
const getError = document.getElementById("weather-error");

function getWeatherCode(code)
{
    const weatherCodes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Drizzle: Light intensity",
        53: "Drizzle: Moderate intensity",
        55: "Drizzle: Dense intensity",
        56: "Freezing Drizzle: Light intensity",
        57: "Freezing Drizzle: Dense intensity",
        61: "Rain: Slight intensity",
        63: "Rain: Moderate intensity",
        65: "Rain: Heavy intensity",
        66: "Freezing Rain: Light intensity",
        67: "Freezing Rain: Heavy intensity",
        71: "Snow fall: Slight intensity",
        73: "Snow fall: Moderate intensity",
        75: "Snow fall: Heavy intensity",
        77: "Snow grains",
        80: "Rain showers: Slight intensity",
        81: "Rain showers: Moderate intensity",
        82: "Rain showers: Violent intensity",
        85: "Snow showers: Slight intensity",
        86: "Snow showers: Heavy intensity",
        95: "Thunderstorm: Slight or moderate",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
    };

    return weatherCodes[code] || "Unknown";
}

function getWindDirection(degree)
{
    const directions = {
        0: "North",
        45: "North-East",
        90: "East",
        135: "South-East",
        180: "South",
        225: "South-West",
        270: "West",
        315: "North-West"
    };

    for (let i = 0;i < 360;i += 45)
        if (degree >= i && degree < i + 45) return directions[i];
    return "Unknown";
}

getSubmit.addEventListener("click", () => {
    let locationInput = getInput.value;
    if (locationInput === "")
    {
        console.log("No input location.");
        return;
    }
    console.log(locationInput);

    let getCord = `https://geocoding-api.open-meteo.com/v1/search?name=${locationInput}&count=1`;
    fetch(getCord)
        .then((response) => {
            if (response.status === 200) return response.json();
            else
            {
                document.getElementById("weather-error").innerText = "Mysterious error, I will fix this as soon as possible!";
                throw new Error("Mysterious error, I will fix this as soon as possible!");
            }
        })
        .then((data) => {
            if (!data.results || data.results.length === 0)
            {
                document.getElementById("weather-error").innerText = `Can't find a location named "${locationInput}".`;
                throw new Error(`Can't find a location named "${locationInput}".`);
            }

            let locationName =  data.results[0].name;
            let lat = data.results[0].latitude;
            let long = data.results[0].longitude;
            let getWeather = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,temperature_2m_min,rain_sum,windspeed_10m_max,windspeed_10m_min,winddirection_10m_dominant&hourly=temperature_2m&timezone=auto&forecast_days=${dayForecast}`;
            fetch(getWeather)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    let weatherCode = data.daily.weathercode[0];
                    let currentHour = new Date().getHours();
                    let currentTemperature = data.hourly.temperature_2m[currentHour];
                    let maxTemperature = data.daily.temperature_2m_max[0];
                    let minTemperature = data.daily.temperature_2m_min[0];
                    let rainSum = data.daily.rain_sum[0];
                    let maxWindSpeed = data.daily.windspeed_10m_max[0];
                    let minWindSpeed = data.daily.windspeed_10m_min[0];
                    let windDirection = data.daily.winddirection_10m_dominant[0];

                    let unitMaxTemperature = data.daily_units.temperature_2m_max;
                    let unitMinTemperature = data.daily_units.temperature_2m_min;
                    let unitRainSum = data.daily_units.rain_sum;
                    let unitMaxWindSpeed = data.daily_units.windspeed_10m_max;
                    let unitMinWindSpeed = data.daily_units.windspeed_10m_min;

                    let result = `<h3> ${locationName} </h3>`;
                    result += "<ol>";
                    result += `<li >Weather: ${getWeatherCode(weatherCode)} </li>`;
                    result += `<li> Current temperature: ${currentTemperature}°C </li>`;
                    result += `<li> Max temperature: ${maxTemperature}${unitMaxTemperature} </li>`;
                    result += `<li> Min temperature: ${minTemperature}${unitMinTemperature} </li>`;
                    result += `<li> Rain: ${rainSum}${unitRainSum} </li>`;
                    result += `<li> Max wind speed: ${maxWindSpeed} ${unitMaxWindSpeed} </li>`;
                    result += `<li> Min wind speed: ${minWindSpeed} ${unitMinWindSpeed} </li>`;
                    result += `<li> Wind direction: ${getWindDirection(windDirection)} </li>`;
                    result += "</ol> <hr>";

                    getResult.innerHTML += result;
                    getError.innerText = "";
                })
                .catch((error) => {
                    console.error(error.message);
                });
        })
        .catch((error) => {
            console.error(error.message);
        });
});