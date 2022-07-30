// variables
var cityFormEl = document.getElementById("new-city");
var cityInputEl = document.getElementById("city-input");
var citySearchTerm = document.querySelectorAll(".city-name");
var clearBtnEl = document.getElementById("clear-button");
var historyParentEl = document.getElementById("recent-searches");
var localStorageCityName = JSON.parse(localStorage.getItem("lastSearch")) || [];

var formSubmitHandler = function (event) 
 