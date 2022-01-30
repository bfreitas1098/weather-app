// Date and time functions

function formatDate() {
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

let date = document.querySelector("#date");
date.innerHTML = formatDate();

function changeBackground() {
  let currentHour = new Date().getHours();
  if (document.body) {
    if (currentHour === 5 || currentHour === 6 || currentHour === 7) {
      document.body.background =
        "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/025/924/original/dawn.jpg?1643494001";
    } else if (currentHour === 8 || currentHour === 9 || currentHour === 10) {
      document.body.background =
        "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/025/926/original/sunrise.jpg?1643494259";
      body.style.color = "#fcfcfc";
    } else if (
      currentHour === 11 ||
      currentHour === 12 ||
      currentHour === 13 ||
      currentHour === 14 ||
      currentHour === 15 ||
      currentHour === 16
    ) {
      document.body.background =
        "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/025/927/original/afternoon.jpg?1643494422";
    } else if (currentHour === 17 || currentHour === 18 || currentHour === 19) {
      document.body.background =
        "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/025/928/original/sunset.jpg?1643494483";
    } else {
      document.body.background =
        "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/025/929/original/night.jpg?1643494495";
      body.style.color = "#fffe9a";
    }
  }
}

let body = document.querySelector("body");

changeBackground();

// Functions to change current temperatures and weather conditions of searched cities

function displayCurrentTemperature(response) {
  fahrenheitTemp = response.data.main.temp;
  document.querySelector("h1").innerHTML = Math.round(fahrenheitTemp);
  document.querySelector("h3").innerHTML = `in ${response.data.name}`;
  document.querySelector("#conditions").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-conditions").innerHTML = Math.round(
    response.data.wind.speed
  );
  fahrenheitMax = response.data.main.temp_max;
  document.querySelector("#temp-max").innerHTML = `${Math.round(
    fahrenheitMax
  )}°`;
  fahrenheitMin = response.data.main.temp_min;
  document.querySelector("#temp-min").innerHTML = `${Math.round(
    fahrenheitMin
  )}°`;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "ed1ad0d4f5bbf7823ad1cdd74e7abf8c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayCurrentTemperature);
}

function conductSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  searchCity(cityInput.value);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", conductSearch);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", conductSearch);

searchCity("Miami");

// Functions to convert the temperature by unit

let fahrenheitTemp = null;
let fahrenheitMax = null;
let fahrenheitMin = null;

function displayCelsiusTemperatures(event) {
  event.preventDefault();
  fahrenheitButton.classList.remove("active");
  celsiusButton.classList.add("active");
  let celsiusTemp = Math.round(((fahrenheitTemp - 32) * 5) / 9);
  document.querySelector("h1").innerHTML = celsiusTemp;
  let celsiusMax = `${Math.round(((fahrenheitMax - 32) * 5) / 9)}°`;
  document.querySelector("#temp-max").innerHTML = celsiusMax;
  let celsiusMin = `${Math.round(((fahrenheitMin - 32) * 5) / 9)}°`;
  document.querySelector("#temp-min").innerHTML = celsiusMin;
}

let celsiusButton = document.querySelector("#celsius-link");
celsiusButton.addEventListener("click", displayCelsiusTemperatures);

function displayFahrenheitTemperatures(event) {
  event.preventDefault();
  celsiusButton.classList.remove("active");
  fahrenheitButton.classList.add("active");
  document.querySelector("h1").innerHTML = Math.round(fahrenheitTemp);
  document.querySelector("#temp-max").innerHTML = `${Math.round(
    fahrenheitMax
  )}°`;
  document.querySelector("#temp-min").innerHTML = `${Math.round(
    fahrenheitMin
  )}°`;
}

let fahrenheitButton = document.querySelector("#fahrenheit-link");
fahrenheitButton.addEventListener("click", displayFahrenheitTemperatures);

// Functions to display the forecast

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
        <div class="forecast-day">${day}</div>
        <img
          id="icon"
          src="https://openweathermap.org/img/wn/04d@2x.png"
          alt="clouds"
          width="50px"
        />
        <br />
        <div class="forecast-temperatures">
          <span class="forecast-weather-max">75° </span>
          <span class="forecast-weather-min"> 60°</span>
        </div>
      </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "ed1ad0d4f5bbf7823ad1cdd74e7abf8c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
