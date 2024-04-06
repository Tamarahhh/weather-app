function updateHeading(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#input-search");
  let cityName = searchInput.value.trim();
  let cityNameElement = document.querySelector("#current-city");
  cityNameElement.innerHTML = cityName;

  getWeatherData(cityName);
}

function displayDateTime() {
  let currentTime = new Date();
  let minutes = currentTime.getMinutes().toString().padStart(2, "0");
  let hours = currentTime.getHours();
  let day = currentTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[day];
  return `${currentDay} ${hours}:${minutes},`;
}

let searchButton = document.querySelector("#input-form");
searchButton.addEventListener("submit", updateHeading);

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = displayDateTime();
setInterval(function () {
  currentDate.innerHTML = displayDateTime();
}, 60000);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}

function displayPrediction(response) {
  let predictionHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      predictionHtml += `
    <div class="weather-prediction-day">
            <div class="weather-prediction-date">${formatDay(day.time)}</div>
            <div>
            <img src="${
              day.condition.icon_url
            }" class="weather-prediction-icon" />
            </div>
            <div class="weather-prediction-temps">
              <div class="weather-prediction-temp">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="weather-prediction-temp">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>
    `;
    }
  });

  let predictionElement = document.querySelector("#prediction");
  predictionElement.innerHTML = predictionHtml;
}

function getWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.temperature.current);
  let tempValue = document.querySelector(".temp-value");
  let description = response.data.condition.description;
  let descriptionElement = document.querySelector("#description");
  let humidity = response.data.temperature.humidity;
  let humidityElement = document.querySelector("#humidity");
  let windspeed = response.data.wind.speed;
  let windspeedElement = document.querySelector("#wind");
  let icon = response.data.condition.icon_url;
  let iconElement = document.querySelector("#icon");

  tempValue.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = `${description}`;
  humidityElement.innerHTML = `${humidity}%`;
  windspeedElement.innerHTML = `${windspeed}km/h`;
  iconElement.innerHTML = `<img
      src="${icon}"
      class="temp-emoji"
    />`;
}

function getWeatherData(city) {
  let apiKey = "459ebc5dot18e0f03c448ce0b4cf73ac";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    getWeather(response);
    getPrediction(response.data.city);
  });
}

function getPrediction(city) {
  let apiKey = "459ebc5dot18e0f03c448ce0b4cf73ac";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios(apiUrl).then(displayPrediction);
}

getWeatherData("Lagos");
