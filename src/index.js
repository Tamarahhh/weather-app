// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20,
//   },
// };
//
// let cityName = prompt("Enter a city");

// if (cityName.toLowerCase() in weather) {
//   let city = weather[cityName.toLowerCase()];
//   let tempCelsius = Math.round(city.temp);
//   let tempFahrenheit = Math.round((city.temp * 9) / 5 + 32);
//   let humidity = city.humidity;
//   alert(
//     `It is currently ${tempCelsius}°C (${tempFahrenheit}°F) in ${cityName} with a humidity of ${humidity}%`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${cityName}`
//   );

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
  return `${currentDay} ${hours}:${minutes}`;
}

let searchButton = document.querySelector("#input-form");
searchButton.addEventListener("submit", updateHeading);

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = displayDateTime();
setInterval(function () {
  currentDate.innerHTML = displayDateTime();
}, 60000);

function getWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.temperature.current);
  let tempValue = document.querySelector(".temp-value");
  tempValue.innerHTML = `${temperature}`;
}

function getWeatherData(city) {
  let apiKey = "459ebc5dot18e0f03c448ce0b4cf73ac";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getWeather);
}
