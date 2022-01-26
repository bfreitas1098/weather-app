function displayCurrentTemperature(response) {
  document.querySelector("h1").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector("h3").innerHTML = `in ${response.data.name}`;
  document.querySelector(
    "#conditions"
  ).innerHTML = `Conditions: ${response.data.weather[0].description}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind-conditions").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} mph`;
}

let apiKey = "ed1ad0d4f5bbf7823ad1cdd74e7abf8c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayCurrentTemperature);
