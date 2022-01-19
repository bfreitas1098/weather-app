// Time & date features

function formatDate(date) {
  let daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = daysOfTheWeek[date.getDay()];
  let hour = date.getHours();
  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let amPm = hour >= 12 ? "PM" : "AM";

  return `${day} ${hour}:${minutes} ${amPm}`;
}

let time = document.querySelector(".date");
let now = new Date();
time.innerHTML = `${formatDate(now)}`;

function getFirstDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay() + 1];
  return `${day}`;
}

function getSecondDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay() + 2];
  return `${day}`;
}

function getThirdDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay() + 3];
  return `${day}`;
}

function getFourthDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay() + 4];
  return `${day}`;
}

function getFifthDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay() + 5];
  return `${day}`;
}

let firstDay = document.querySelector(".first-day");
let nextDay = now.getDay();
firstDay.innerHTML = `${getFirstDay(nextDay)}`;

let secondDay = document.querySelector(".second-day");
secondDay.innerHTML = `${getSecondDay(nextDay)}`;

let thirdDay = document.querySelector(".third-day");
thirdDay.innerHTML = `${getThirdDay(nextDay)}`;

let fourthDay = document.querySelector(".fourth-day");
fourthDay.innerHTML = `${getFourthDay(nextDay)}`;

let fifthDay = document.querySelector(".fifth-day");
fifthDay.innerHTML = `${getFifthDay(nextDay)}`;

// Functions to display current weather in top left

function searchCity(city) {
  let apiKey = "ed1ad0d4f5bbf7823ad1cdd74e7abf8c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  searchCity(city);
}

let findCity = document.querySelector("form");
findCity.addEventListener("submit", handleSubmit);

function displayWeatherConditions(response) {
  document.querySelector(".location").innerHTML = `in ${response.data.name}`;
  document.querySelector(".temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector(".wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} mph`;
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    ".humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector(".high-temp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector(".low-temp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
}

// Functions to get current location temperatures and maximums/minimums at the bottom of the screen

function getSubmitResult(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  getUpcomingForecast(city);
}

let weatherPredictions = document.querySelector("form");
weatherPredictions.addEventListener("submit", getSubmitResult);

function getCurrentLocation(position) {
  let apiKey = "ed1ad0d4f5bbf7823ad1cdd74e7abf8c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function getCurrentMaxMinTemps(position) {
  let apiKey = "ed1ad0d4f5bbf7823ad1cdd74e7abf8c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=5&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(changeNextDaysForecast);
}

function findCurrentTemperature(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

function findCurrentMaxMinTemps(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentMaxMinTemps);
}
let currentLocation = document.querySelector(".current");
currentLocation.addEventListener("click", findCurrentTemperature);

let maxMinTemps = document.querySelector("button");
maxMinTemps.addEventListener("click", findCurrentMaxMinTemps);

function changeNextDaysForecastToCelcius(response) {
  document.querySelector(".high-temp-wed").innerHTML = `${Math.round(
    response.data.list[0].temp.max
  )}°`;
  document.querySelector(".high-temp-thurs").innerHTML = `${Math.round(
    response.data.list[1].temp.max
  )}°`;
  document.querySelector(".high-temp-fri").innerHTML = `${Math.round(
    response.data.list[2].temp.max
  )}°`;
  document.querySelector(".high-temp-sat").innerHTML = `${Math.round(
    response.data.list[3].temp.max
  )}°`;
  document.querySelector(".high-temp-sun").innerHTML = `${Math.round(
    response.data.list[4].temp.max
  )}°`;
  document.querySelector(".low-temp-wed").innerHTML = `${Math.round(
    response.data.list[0].temp.min
  )}°`;
  document.querySelector(".low-temp-thurs").innerHTML = `${Math.round(
    response.data.list[1].temp.min
  )}°`;
  document.querySelector(".low-temp-fri").innerHTML = `${Math.round(
    response.data.list[2].temp.min
  )}°`;
  document.querySelector(".low-temp-sat").innerHTML = `${Math.round(
    response.data.list[3].temp.min
  )}°`;
  document.querySelector(".low-temp-sun").innerHTML = `${Math.round(
    response.data.list[4].temp.min
  )}°`;
}

function changeNextDaysForecast(response) {
  document.querySelector(".high-temp-wed").innerHTML = `${Math.round(
    response.data.list[0].temp.max
  )}°`;
  document.querySelector(".high-temp-thurs").innerHTML = `${Math.round(
    response.data.list[1].temp.max
  )}°`;
  document.querySelector(".high-temp-fri").innerHTML = `${Math.round(
    response.data.list[2].temp.max
  )}°`;
  document.querySelector(".high-temp-sat").innerHTML = `${Math.round(
    response.data.list[3].temp.max
  )}°`;
  document.querySelector(".high-temp-sun").innerHTML = `${Math.round(
    response.data.list[4].temp.max
  )}°`;
  document.querySelector(".low-temp-wed").innerHTML = `${Math.round(
    response.data.list[0].temp.min
  )}°`;
  document.querySelector(".low-temp-thurs").innerHTML = `${Math.round(
    response.data.list[1].temp.min
  )}°`;
  document.querySelector(".low-temp-fri").innerHTML = `${Math.round(
    response.data.list[2].temp.min
  )}°`;
  document.querySelector(".low-temp-sat").innerHTML = `${Math.round(
    response.data.list[3].temp.min
  )}°`;
  document.querySelector(".low-temp-sun").innerHTML = `${Math.round(
    response.data.list[4].temp.min
  )}°`;
}

function getUpcomingForecast(city) {
  let apiKey = "def97117db95d1d3d51e5affceff1ce7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=5&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(changeNextDaysForecast);
}

// Functions to convert from fahrenheit to celcius

function getFahrenehitTemperatureSubmission(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  findFahrenehitTemperature(city);
  getUpcomingForecast(city);
}

function getCelciusTemperatureSubmission(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  findCelciusTemperature(city);
  getUpcomingCelciusForecast(city);
}

let imperialTemp = document.querySelector(".fahrenheit");
imperialTemp.addEventListener("click", getFahrenehitTemperatureSubmission);

let metricTemp = document.querySelector(".celcius");
metricTemp.addEventListener("click", getCelciusTemperatureSubmission);

function findFahrenehitTemperature(city) {
  let apiKey = "ed1ad0d4f5bbf7823ad1cdd74e7abf8c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getFahrenehitTemperature);
}

function getFahrenehitTemperature(response) {
  document.querySelector(".temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector(".high-temp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector(".low-temp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
}

function findCelciusTemperature(city) {
  let apiKey = "ed1ad0d4f5bbf7823ad1cdd74e7abf8c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCelciusTemperature);
}

function getCelciusTemperature(response) {
  document.querySelector(".temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector(".high-temp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector(".low-temp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
}

function getUpcomingCelciusForecast(city) {
  let apiKey = "def97117db95d1d3d51e5affceff1ce7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=5&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeNextDaysForecastToCelcius);
}

// Temperature that shows when you load the page

searchCity("Miami");
getUpcomingForecast("Miami");
