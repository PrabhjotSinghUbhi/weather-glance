const apiKey = "58b9914c13cf93af0f52d4cb17dd12ff"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric"

const inputField = document.querySelector('input')

const suggestBox = document.getElementById('suggestion')

const weatherImg = document.querySelectorAll('img')[0];

//New Suggestion Feature to add.
async function giveSuggestion() {

    let query = inputField.value.trim();

    if (query.length < 2) {
        suggestBox.style.display = 'none';
        return;
    }

    try {
        const nameApi = `https://secure.geonames.org/searchJSON?name_startsWith=${query}&maxRows=5&username=gurkirat_641`
        let response = await fetch(nameApi);
        let suggestions = await response.json()

        suggestBox.innerHTML = "";

        if (suggestions.geonames.length > 0) {
            suggestBox.style.display = 'block'
        } else {
            suggestBox.style.display = 'block'
        }

        suggestions.geonames.forEach(city => {
            const cityOption = document.createElement('div')
            cityOption.classList.add("suggestion-item")
            cityOption.textContent = `${city.name}, ${city.countryName}`

            cityOption.addEventListener(
                "click", () => {
                    inputField.value = cityOption.textContent;
                    suggestBox.style.display = "none";
                }
            )
            suggestBox.appendChild(cityOption)
        });

    } catch (error) {
        console.error("Error while fetching the city Names", error);

    }
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

inputField.addEventListener("input", giveSuggestion);

window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkWeather();
    }
})

inputField.addEventListener('blur', () => {
    console.log("Input field is not active");
    suggestBox.style.display = "none"
})