// OpenWeather API Key
const API_KEY = "3fc20d7c6f24ba73ab67839c74fec360";


// Get HTML elements

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

const weatherContainer =
    document.getElementById("weatherContainer");

const cityName =
    document.getElementById("cityName");

const dateElement =
    document.getElementById("date");

const weatherIcon =
    document.getElementById("weatherIcon");

const temperature =
    document.getElementById("temperature");

const condition =
    document.getElementById("condition");

const feelsLike =
    document.getElementById("feelsLike");

const humidity =
    document.getElementById("humidity");

const wind =
    document.getElementById("wind");

const pressure =
    document.getElementById("pressure");

const sunrise =
    document.getElementById("sunrise");

const sunset =
    document.getElementById("sunset");

const forecast =
    document.getElementById("forecast");

const recentSearches =
    document.getElementById("recentSearches");

const themeBtn =
    document.getElementById("themeBtn");


// Search Weather

searchBtn.addEventListener("click", function() {

    const city = cityInput.value.trim();

    if (city === "") {

        showError("Please enter a city name.");

        return;
    }

    getWeather(city);

});


// Enter key

cityInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        searchBtn.click();

    }

});


// Get Weather

async function getWeather(city) {

    showLoading();

    hideError();


    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;


        const response = await fetch(url);


        if (!response.ok) {

            throw new Error("City not found");

        }


        const data = await response.json();


        displayWeather(data);


        getForecast(city);


        saveRecentCity(city);

    }

    catch (err) {

        showError(
            "City not found. Please enter a valid city."
        );

        weatherContainer.style.display = "none";

    }

    finally {

        hideLoading();

    }

}


// Display Current Weather

function displayWeather(data) {

    weatherContainer.style.display = "block";


    cityName.textContent =
        `${data.name}, ${data.sys.country}`;


    const today = new Date();

    dateElement.textContent =
        today.toDateString();


    temperature.textContent =
        `${Math.round(data.main.temp)}°C`;


    condition.textContent =
        data.weather[0].description;


    feelsLike.textContent =
        `${Math.round(data.main.feels_like)}°C`;


    humidity.textContent =
        `${data.main.humidity}%`;


    wind.textContent =
        `${Math.round(data.wind.speed * 3.6)} km/h`;


    pressure.textContent =
        `${data.main.pressure} hPa`;


    weatherIcon.textContent =
        getWeatherIcon(data.weather[0].main);


    sunrise.textContent =
        formatTime(data.sys.sunrise);


    sunset.textContent =
        formatTime(data.sys.sunset);

}


// Weather Icon

function getWeatherIcon(weather) {

    if (weather === "Clear") {

        return "☀️";

    }

    if (weather === "Clouds") {

        return "☁️";

    }

    if (weather === "Rain") {

        return "🌧️";

    }

    if (weather === "Drizzle") {

        return "🌦️";

    }

    if (weather === "Thunderstorm") {

        return "⛈️";

    }

    if (weather === "Snow") {

        return "❄️";

    }

    if (weather === "Mist" ||
        weather === "Fog" ||
        weather === "Haze") {

        return "🌫️";

    }

    return "🌤️";

}


// Format Time

function formatTime(timestamp) {

    const date =
        new Date(timestamp * 1000);


    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

}


// Get 5-Day Forecast

async function getForecast(city) {

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;


        const response =
            await fetch(url);


        const data =
            await response.json();


        displayForecast(data);

    }

    catch (err) {

        console.log("Forecast error:", err);

    }

}


// Display Forecast

function displayForecast(data) {

    forecast.innerHTML = "";


    const dailyData = [];

    for (let i = 0; i < data.list.length; i++) {

        const item = data.list[i];


        // Select data around 12 PM

        if (item.dt_txt.includes("12:00:00")) {

            dailyData.push(item);

        }

    }


    dailyData.slice(0, 5).forEach(function(item) {

        const card =
            document.createElement("div");


        card.className =
            "forecast-card";


        const date =
            new Date(item.dt * 1000);


        const day =
            date.toLocaleDateString(
                "en-US",
                { weekday: "short" }
            );


        card.innerHTML = `

            <h3>${day}</h3>

            <div class="icon">
                ${getWeatherIcon(item.weather[0].main)}
            </div>

            <div class="temp">
                ${Math.round(item.main.temp)}°C
            </div>

            <div class="description">
                ${item.weather[0].description}
            </div>

        `;


        forecast.appendChild(card);

    });

}


// Loading

function showLoading() {

    loading.style.display = "block";

}


function hideLoading() {

    loading.style.display = "none";

}


// Error

function showError(message) {

    error.textContent = message;

    error.style.display = "block";

}


function hideError() {

    error.style.display = "none";

}


// Recent Searches

function saveRecentCity(city) {

    let cities =
        JSON.parse(
            localStorage.getItem("recentCities")
        ) || [];


    // Remove duplicate

    cities =
        cities.filter(function(item) {

            return item.toLowerCase() !==
                   city.toLowerCase();

        });


    // Add city at beginning

    cities.unshift(city);


    // Keep only 5 cities

    cities = cities.slice(0, 5);


    localStorage.setItem(
        "recentCities",
        JSON.stringify(cities)
    );


    displayRecentCities();

}


// Display Recent Cities

function displayRecentCities() {

    const cities =
        JSON.parse(
            localStorage.getItem("recentCities")
        ) || [];


    recentSearches.innerHTML = "";


    cities.forEach(function(city) {

        const button =
            document.createElement("button");


        button.className =
            "recent-city";


        button.textContent =
            city;


        button.addEventListener(
            "click",
            function() {

                cityInput.value = city;

                getWeather(city);

            }
        );


        recentSearches.appendChild(button);

    });

}


// Current Location

locationBtn.addEventListener(
    "click",
    function() {

        if (!navigator.geolocation) {

            showError(
                "Geolocation is not supported by your browser."
            );

            return;

        }


        navigator.geolocation.getCurrentPosition(

            function(position) {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;


                getWeatherByLocation(
                    latitude,
                    longitude
                );

            },

            function() {

                showError(
                    "Unable to get your location."
                );

            }

        );

    }
);


// Weather by Location

async function getWeatherByLocation(
    latitude,
    longitude
) {

    showLoading();

    hideError();


    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error("Location error");

        }


        const data =
            await response.json();


        displayWeather(data);


        getForecast(
            data.name
        );


        saveRecentCity(
            data.name
        );

    }

    catch (err) {

        showError(
            "Unable to fetch weather."
        );

    }

    finally {

        hideLoading();

    }

}


// Dark / Light Mode

themeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle("dark");


        if (
            document.body.classList.contains("dark")
        ) {

            themeBtn.textContent = "☀️";

            localStorage.setItem(
                "theme",
                "dark"
            );

        }

        else {

            themeBtn.textContent = "🌙";

            localStorage.setItem(
                "theme",
                "light"
            );

        }

    }
);


// Load saved theme

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


// Display recent searches on startup

displayRecentCities();