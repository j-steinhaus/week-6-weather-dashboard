// variables

var apiKey = "26db44b3a6828d5c6a423a0580485f3f";
var fiveEl = document.getElementById("5day");
var currentEl = document.getElementById("current-forecast");
var cityFormEl = document.getElementById("new-city");
var cityInputEl = document.getElementById("city-input");
var clearBtnEl = document.getElementById("clear-button");
var submitBtn = document.getElementById("submit");
var historyParentEl = document.getElementById("recent-searches");
var localStorageCityName = JSON.parse(localStorage.getItem("lastSearch")) || [];

//  variables for symbols
var perSym = "%";
var farSym = "֯֯°F";
var windSym = "MPH";

// search history
var displayLastSearched = function (cityName) {
  var recentSearchListParent = document.getElementById("recent-searches");
  var lastSearchButtonEl = document.createElement("button");
  lastSearchButtonEl.setAttribute("class", "btn last-searched-button");
  capitolizedCityName = cityName
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
  lastSearchButtonEl.innerText = capitolizedCityName;
  lastSearchButtonEl.addEventListener("click", () => {
    cityInputEl.value = cityName;
    test();
  });
  recentSearchListParent.appendChild(lastSearchButtonEl);
  clearBtnEl.addEventListener("click", clearHistory);
};

var formSubmitHandler = function (event) {
  event.preventDefault();
  setLocalStorage();
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
          var currentTemp = document.createElement("h4");
          currentTemp.textContent = `${data.current.temp} ${farSym}`;
          currentEl.append(currentTemp);

          // icon code for weather
          var icon = document.createElement("img");
          icon.setAttribute("src", iconUrl);
          currentEl.append(icon);

          //   wind code
          var wind = document.createElement("h5");
          wind.textContent = `wind: ${data.current.wind_speed} ${windSym}`;
          currentEl.append(wind);

          // humidity code here
          var humidity = document.createElement("h5");
          humidity.textContent = `humidity: ${data.current.humidity} ${perSym}`;
          currentEl.append(humidity);

          // UV Index Code here
          var uvIndex = document.createElement("h5");
          uvIndex.textContent = `uv Index: ${data.current.uvi}`;
          currentEl.append(uvIndex);

          // 5 Day Forecast Below

          //   clears out
          fiveEl.innerHTML = "";

          for (let index = 0; index < data.daily.length - 3; index++) {
            const element = data.daily[index];

            console.log(element);

            var dailyDiv = document.createElement("div");
            var dailyIcon = data.daily[index].weather[0].icon;
            var iconUrl2 = `https://openweathermap.org/img/wn/${dailyIcon}@2x.png`;

            // 5 day forecast
            var forecastTemp = document.createElement("h3");
            forecastTemp.textContent = `${data.daily[index].temp.day} ${farSym}`;
            dailyDiv.append(forecastTemp);

            // icon for 5day
            var icon2 = document.createElement("img");
            icon2.setAttribute("src", iconUrl2);
            dailyDiv.append(icon2);

            // wind 5 day code
            var wind5 = document.createElement("h6");
            wind5.textContent = `wind: ${data.daily[index].wind_speed} ${windSym}`;
            dailyDiv.append(wind5);

            // humidity 5 day code here
            var humidity5 = document.createElement("h6");
            humidity5.textContent = `humidity: ${data.daily[index].humidity} ${perSym}`;
            dailyDiv.append(humidity5);

            // // UV 5 day Index Code here
            // var uvIndex5 = document.createElement("h6");
            // uvIndex5.textContent = `uv Index: ${data.daily[index].uvi}`;
            // dailyDiv.append(uvIndex5);

            // important - stay here
            fiveEl.append(dailyDiv);
          }
        });
    });
};
//////////////////////////
function test() {
  setLocalStorage();
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
          var currentTemp = document.createElement("h4");
          currentTemp.textContent = `${data.current.temp} ${farSym}`;
          currentEl.append(currentTemp);

          // icon code for weather
          var icon = document.createElement("img");
          icon.setAttribute("src", iconUrl);
          currentEl.append(icon);

          //   wind code
          var wind = document.createElement("h5");
          wind.textContent = `wind: ${data.current.wind_speed} ${windSym}`;
          currentEl.append(wind);

          // humidity code here
          var humidity = document.createElement("h5");
          humidity.textContent = `humidity: ${data.current.humidity} ${perSym}`;
          currentEl.append(humidity);

          // UV Index Code here
          var uvIndex = document.createElement("h5");
          uvIndex.textContent = `uv Index: ${data.current.uvi}`;
          currentEl.append(uvIndex);

          // 5 Day Forecast Below

          //   clears out
          fiveEl.innerHTML = "";

          for (let index = 0; index < data.daily.length - 3; index++) {
            const element = data.daily[index];

            console.log(element);

            var dailyDiv = document.createElement("div");
            var dailyIcon = data.daily[index].weather[0].icon;
            var iconUrl2 = `https://openweathermap.org/img/wn/${dailyIcon}@2x.png`;

            // 5 day forecast
            var forecastTemp = document.createElement("h3");
            forecastTemp.textContent = `${data.daily[index].temp.day} ${farSym}`;
            dailyDiv.append(forecastTemp);

            // icon for 5day
            var icon2 = document.createElement("img");
            icon2.setAttribute("src", iconUrl2);
            dailyDiv.append(icon2);

            // wind 5 day code
            var wind5 = document.createElement("h6");
            wind5.textContent = `wind: ${data.daily[index].wind_speed} ${windSym}`;
            dailyDiv.append(wind5);

            // humidity 5 day code here
            var humidity5 = document.createElement("h6");
            humidity5.textContent = `humidity: ${data.daily[index].humidity} ${perSym}`;
            dailyDiv.append(humidity5);

            // // UV 5 day Index Code here
            // var uvIndex5 = document.createElement("h6");
            // uvIndex5.textContent = `uv Index: ${data.daily[index].uvi}`;
            // dailyDiv.append(uvIndex5);

            // important - stay here
            fiveEl.append(dailyDiv);
          }
        });
    });
}

submitBtn.addEventListener("click", formSubmitHandler);

function setLocalStorage() {
  const lastSearch = cityInputEl.value.trim();
  localStorageCityName.push(lastSearch);
  localStorage.setItem("lastSearch", JSON.stringify(localStorageCityName));
}

// Load last searched
var loadLastSearched = function () {
  lastSearch = JSON.parse(localStorage.getItem("lastSearch")) || [];

  // create empty string if there is nothing saved in localStorage
  if (lastSearch.length !== 0) {
    for (i = 0; i < lastSearch.length; i++) {
      displayLastSearched(lastSearch[i]);
    }
  }
};

// clear recent city search history
var clearHistory = function () {
  window.localStorage.removeItem("lastSearch");
  window.location.reload();
};

// reload recent search on button click
// var reSearchRecent = function (event) {
//   var recentSearch = event.target.textContent;
//   fetchCityCoordinates(recentSearch);
// };

loadLastSearched();
cityFormEl.addEventListener("submit", formSubmitHandler);
// historyParentEl.addEventListener("click", reSearchRecent);

// re-use search history buttons

function renderButtons() {
  //citiesAlreadySearched is global variable
  btnAppend.innerHTML = "";

  for (let index = 0; index < citiesAlreadySearched.length; index++) {
    const createBtnEl = document.createElement("button");
    createBtnEl.classList.add("mb-1");
    createBtnEl.textContent = citiesAlreadySearched[index];
    //creating event listener for these buttons so i can click and search that same city again
    createBtnEl.addEventListener("click", () => {
      userInput.value = citiesAlreadySearched[index];
    });
    btnAppend.append(createBtnEl);
  }
}
