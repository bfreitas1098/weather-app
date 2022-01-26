function formatDate(timestamp) {
  let date = new Date(timestamp);
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

function displayCurrentTemperature(response) {
  document.querySelector("h1").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector("h3").innerHTML = `in ${response.data.name}`;
  document.querySelector("#conditions").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-conditions").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#temp-max").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector("#temp-min").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
}

let apiKey = "ed1ad0d4f5bbf7823ad1cdd74e7abf8c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayCurrentTemperature);
