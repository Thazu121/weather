const apiKey = "d6ee7291d67f4580ee83ee5141a32c87";


const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityName");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
    const city = cityInput.value.trim();
    if (!city) return;

    loading.classList.remove("d-none");
    error.classList.add("d-none");

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!res.ok) throw new Error("City not found");

        const data = await res.json();
        updateUI(data);
    } catch (err) {
        error.textContent = err.message;
        error.classList.remove("d-none");
    } finally {
        loading.classList.add("d-none");
    }
}

function updateUI(data) {
    document.getElementById("temperature").textContent =
        Math.round(data.main.temp) + "°C";
    document.getElementById("city").textContent = data.name;
    document.getElementById("description").textContent =
        data.weather[0].description;
    document.getElementById("humidity").textContent =
        data.main.humidity + "%";
    document.getElementById("wind").textContent =
        data.wind.speed + " km/h";

    changeBackground(data.weather[0].main.toLowerCase());
}

function changeBackground(weather) {
    const image = document.getElementById("bgImage");
    let imageSrc = "img/default.jpg"; 

    if (weather.includes("rain")) {
        imageSrc = "images/rain.jpg";
    } else if (weather.includes("cloud")) {
        imageSrc = "images/cloudy.avif";
    } else if (weather.includes("clear")) {
        imageSrc = "images/sunny.avif";
    }

    image.style.backgroundImage = `url('${imageSrc}')`;
}
