const apiKey = "be4d38b2ee3d8bd40fd107210ed75e55";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

const weatherDetails = document.getElementById('weather-details');
const cityNameDisplay = document.getElementById('city-name');
const tempDisplay = document.getElementById('temperature');
const descDisplay = document.getElementById('description');
const humidityDisplay = document.getElementById('humidity');
const windDisplay = document.getElementById('wind-speed');
const errorDisplay = document.getElementById('error-message');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        checkWeather(city);
    }
});

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status === 404) {
            weatherDetails.style.display = 'none';
            errorDisplay.style.display = 'block';
            return;
        }

        const data = await response.json();
        
        // Update DOM elements with weather data
        cityNameDisplay.innerHTML = data.name;
        tempDisplay.innerHTML = `Temperature: ${Math.round(data.main.temp)}°C`;
        descDisplay.innerHTML = `Condition: ${data.weather[0].description}`;
        humidityDisplay.innerHTML = `Humidity: ${data.main.humidity}%`;
        windDisplay.innerHTML = `Wind Speed: ${data.wind.speed} m/s`;

        // Display the weather card and hide the error message
        weatherDetails.style.display = 'block';
        errorDisplay.style.display = 'none';

    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherDetails.style.display = 'none';
        errorDisplay.innerHTML = 'Could not fetch data.';
        errorDisplay.style.display = 'block';
    }
}
