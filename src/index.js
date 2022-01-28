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
  let date = new Date();
  let hours = date.getHours();
  if (hours === 11 || 12 || 13 || 14 || 15 || 16) {
    document.body.className = "afternoon";
  } else if (hours === 17 || 18 || 19) {
    document.body.className = "sunset";
    document.getElementById("body").style.color = "white";
    document.getElementsByClassName("active").style.color = "#fffc3a";
    document.getElementsByClassName("github-link").style.color = "#fffc3a";
  } else if (hours === 20 || 21 || 22 || 23 || 0 || 1 || 2 || 3 || 4) {
    document.body.className = "night";
    document.getElementById("body").style.color = "white";
    document.getElementsByClassName("active").style.color = "#fffc3a";
    document.getElementsByClassName("github-link").style.color = "#fffc3a";
  } else if (hours === 5 || 6 || 7) {
    document.body.className = "dawn";
  } else {
    document.body.className = "sunrise";
    document.getElementById("body").style.color = "white";
    document.getElementsByClassName("active").style.color = "#fffc3a";
    document.getElementsByClassName("github-link").style.color = "#fffc3a";
  }
}

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

function displayForecast() {
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

displayForecast();
