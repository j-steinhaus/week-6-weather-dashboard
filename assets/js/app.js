// variables

var apiKey = "26db44b3a6828d5c6a423a0580485f3f";
var fiveEl = document.getElementById("5day");
var currentEl = document.getElementById("current-forecast");
var cityFormEl = document.getElementById("new-city");
var cityInputEl = document.getElementById("city-input");
var citySearchTerm = document.querySelectorAll(".city-name");
var clearBtnEl = document.getElementById("clear-button");
var submitBtn = document.getElementById("submit");
var historyParentEl = document.getElementById("recent-searches");
var localStorageCityName = JSON.parse(localStorage.getItem("lastSearch")) || [];

var formSubmitHandler = function (event) {
  event.preventDefault();
  var userInput = cityInputEl.value.trim();
  var coordinates =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    userInput +
    "&appid=" +
    apiKey;

  fetch(coordinates)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      console.log(lat, lon);

      var weatherData = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}`;
      fetch(weatherData)
        .then(function (response) {
          return response.json();
        })

        // current forceast below
        .then(function (data) {
          var currentIcon = data.current.weather[0].icon;
          var iconUrl = `https://openweathermap.org/img/wn/${currentIcon}@2x.png`;

          console.log(data);

          //   clears out
          currentEl.innerHTML = "";

          //   current temp
          var currentTemp = document.createElement("h3");
          currentTemp.textContent = data.current.temp;
          currentEl.append(currentTemp);

          // icon code for weather
          var icon = document.createElement("img");
          icon.setAttribute("src", iconUrl);
          currentEl.append(icon);

          // humidity code here
          var humidity = document.createElement("h4");
          humidity.textContent = data.current.humidity;
          currentEl.append(humidity);

          // UV Index Code here
          var uvIndex = document.createElement("h4");
          uvIndex.textContent = data.current.uvi;
          currentEl.append(uvIndex);

          // 5 Day Forecase Below

          for (let index = 0; index < data.daily.length - 3; index++) {
            const element = data.daily[index];
            console.log(element);

            var dailyDiv = document.createElement("div");
            var dailyIcon = data.daily[index].weather[0].icon;
            var iconUrl2 = `https://openweathermap.org/img/wn/${dailyIcon}@2x.png`;

            // 5 day forecast
            var forecastTemp = document.createElement("h3");
            forecastTemp.textContent = data.daily[index].temp.day;
            dailyDiv.append(forecastTemp);

            // icon for 5day
            var icon2 = document.createElement("img");
            icon2.setAttribute("src", iconUrl2);
            dailyDiv.append(icon2);

            // humidity 5 day code here
            var humidity5 = document.createElement("h4");
            console.log(humidity5);
            humidity5.textContent = data.daily[index].humidity;
            dailyDiv.append(humidity5);

            // UV 5 day Index Code here
            var uvIndex5 = document.createElement("h4");
            uvIndex5.textContent = data.daily[index].uvi;
            dailyDiv.append(uvIndex5);

            // important - stay here
            fiveEl.append(dailyDiv);
          }
        });
    });
};

submitBtn.addEventListener("click", formSubmitHandler);
