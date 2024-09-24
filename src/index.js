const apiKey = "96o1dcba5f079b5af855ct0319a64729"; // Replace with your SheCodes API key
const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currentCity = document.getElementById("current-city");
const weatherDescription = document.getElementById("weather-description");
const humidityValue = document.getElementById("humidity-value");
const windSpeedValue = document.getElementById("wind-speed-value");
const currentTemperature = document.getElementById("current-temperature");
const weatherIcon = document.getElementById("weather-icon");
const currentDate = document.getElementById("current-date");

async function getWeatherData(city) {
  try {
    const response = await axios.get(
      `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching the weather data:", error);
    alert("Could not retrieve weather data. Please try again.");
  }
}

function updateWeatherUI(data) {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  currentDate.textContent = now.toLocaleString("en-US", options);
  currentCity.textContent = data.city;
  weatherDescription.textContent = data.condition.description;
  humidityValue.textContent = `${data.temperature.humidity}%`;
  windSpeedValue.textContent = `${data.wind.speed} m/s`;
  currentTemperature.textContent =
    Math.round(data.temperature.current) || "N/A"; // Ensure it shows "N/A" if not available
  weatherIcon.innerHTML = `<img src="${data.condition.icon_url}" alt="${data.condition.description}" />`;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the default form submission
  const city = searchInput.value.trim();
  if (city) {
    const weatherData = await getWeatherData(city);
    if (weatherData) {
      updateWeatherUI(weatherData);
    }
  }
  searchInput.value = ""; // Clear the input field
});

// Optionally, you can set a default city to load when the page first opens
window.onload = async () => {
  const defaultCity = "Paris"; // Change this to your preferred default city
  const weatherData = await getWeatherData(defaultCity);
  if (weatherData) {
    updateWeatherUI(weatherData);
  }
};
