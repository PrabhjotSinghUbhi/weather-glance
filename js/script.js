const apiKey = "58b9914c13cf93af0f52d4cb17dd12ff"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric"

const nameApi = 'https://secure.geonames.org/searchJSON?name_startsWith=lon&maxRows=5&username=gurkirat_641'
const inputField = document.querySelector('input')

const weatherImg = document.querySelectorAll('img')[0];

//New Suggestion Feature to add.
async function giveSuggestion() {
    let response = await fetch(nameApi);
    let suggestions = await response.json()

    console.log(suggestions);
}

async function checkWeather() {
    let cityName = inputField.value
    console.log(cityName)

    const response = await fetch(apiUrl + `&q=${cityName}` + `&appid=${apiKey}`)
    let data = await response.json()

    console.log(data);

    //Choose the elements
    const humidity = document.querySelector('#humidity p')
    const wind = document.querySelector("#windSpeed p")
    const city = document.getElementById("city")
    const temperature = document.getElementById("temp")

    //Fill Out the element appropriately.
    humidity.innerHTML = `${data.main.humidity}%`;
    wind.innerHTML = `${data.wind.speed} km/h`;
    city.innerHTML = `${data.name}`

    let temp = Math.floor(parseInt(data.main.temp));

    temperature.innerHTML = `${(temp)}&#176;C`

    let main = data.weather[0].main;
    console.log(data.weather[0].main);

    if (main === 'Clouds') {
        weatherImg.src = '../img/images/clouds.png'
    } else if (main === 'Clear') {
        weatherImg.src = '../img/images/clear.png'
    } else if (main === 'Drizzle') {
        weatherImg.src = "../img/images/drizzle.png"
    } else if (main === 'Mist') {
        weatherImg.src = "../img/images/mist.png"
    } else if (main === 'Rain') {
        weatherImg.src = "../img/images/rain.png"
    } else if (main === 'Snow') {
        weatherImg.src = "../img/images/snow.png"
    }

    inputField.value = "";
}

const btn = document.getElementById('searchBtn')

btn.addEventListener('click', checkWeather)

inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkWeather();
    }
})