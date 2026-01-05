const apiKey = "d6ee7291d67f4580ee83ee5141a32c87";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityName");

const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const weatherContent = document.getElementById("weatherContent");

const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");

searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather();
});

async function getWeather() {
  const cityName = cityInput.value.trim();

  if (!cityName) {
    showError("Please enter a city name");
    return;
  }

  loading.classList.remove("d-none");
  errorBox.classList.add("d-none");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        cityName
      )}&units=metric&appid=${apiKey}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "City not found");
    }

    updateUI(data);
  } catch (error) {
    showError(error.message);
  } finally {
    loading.classList.add("d-none");
  }
}

function updateUI(data) {
  weatherContent.classList.remove("d-none");

  temperature.innerText = `${Math.round(data.main.temp)}°C`;
  city.innerText = data.name;
  description.innerText = data.weather[0].description;
  humidity.innerText = `${data.main.humidity}%`;
  wind.innerText = Math.round(data.wind.speed * 3.6);

  setWeatherIcon(data.weather[0].main);
}

function setWeatherIcon(condition) {
  weatherIcon.className = "weather-icon fa-solid";

  switch (condition) {
    case "Clear":
      weatherIcon.classList.add("fa-sun");
      break;
    case "Clouds":
      weatherIcon.classList.add("fa-cloud");
      break;
    case "Rain":
      weatherIcon.classList.add("fa-cloud-rain");
      break;
    case "Thunderstorm":
      weatherIcon.classList.add("fa-bolt");
      break;
    case "Snow":
      weatherIcon.classList.add("fa-snowflake");
      break;
    case "Mist":
    case "Haze":
    case "Fog":
      weatherIcon.classList.add("fa-smog");
      break;
    default:
      weatherIcon.classList.add("fa-cloud-sun");
  }
}

function showError(message) {
  errorBox.innerText = message;
  errorBox.classList.remove("d-none");
  weatherContent.classList.add("d-none");
}
