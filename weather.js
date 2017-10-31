let getWeather = function() {
  navigator.geolocation.getCurrentPosition(function(pos) {
    let crd = pos.coords;
    let latitude = crd.latitude;
    let longitude = crd.longitude;
    console.log("latitude: " + latitude);
    console.log("longitude: " + longitude);

    let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
    openweathermap_api_url += 'lat=' + latitude
    openweathermap_api_url += '&lon=' + longitude
    openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'

    fetch(openweathermap_api_url).then(convertToJSON).then(updateWeather).catch(displayError);
  });
}

let convertToJSON = function(response) {
  return response.json();
}

let updateWeather = function(input) {
  // parse the input to get temperature
  let name = input.name;
  let temp = input.main.temp;

  // update location name
  let elt = document.getElementById("location");
  elt.innerText = name;

  // replace temperature message
  elt = document.getElementById("message");
  elt.innerText = "It is " + Math.round(temp, 0) + " degrees outside.";

  // update icon
  let icon_name = input.weather[0].icon
  let icon_url = "http://openweathermap.org/img/w/" + icon_name + ".png"
  elt = document.getElementById("weather-icon");
  elt.src = icon_url;
}

let displayError = function(error) {
  console.debug(error);
  window.alert("Sorry, something went wrong.");
}

// HINT:
// Weather icon example:
// The very last part ('10d.png') can change based on the current conditions.
