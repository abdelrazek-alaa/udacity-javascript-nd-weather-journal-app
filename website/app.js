/* Global Variables */
const zip = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");
const generateButton = document.querySelector("#generate");
const ResultDate = document.querySelector("#entryHolder #date");
const ResultTemp = document.querySelector("#entryHolder #temp");
const ResultContent = document.querySelector("#entryHolder #content");

//Api url and Api Key
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&units=metric&appid=YOUR API KEY HERE"; // put your api key here

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//Event listener for generate button to call the api , store data to app server and update the UI dynamically
generateButton.addEventListener("click", () => {
  const fullUrl = baseUrl + zip.value + apiKey;
  getDataFromApi(fullUrl)
    .then((data) => {
      postData("/postData", {
        temperature: data.main.temp,
        date: newDate,
        userResponse: { zip: zip.value, feelings: feelings.value },
      });
    })
    .then(() => {
      getDataFromServer("/all");
    })
    .catch((e) => console.log(e));
});

/*  Asynchronous functions */

//make a POST request to add the API data, as well as data entered by the user, to app
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

//make a GET request to the OpenWeatherMap API
async function getDataFromApi(url = "") {
  const response = await fetch(url);
  return response.json();
}

//retrieve data from the app, select the necessary elements on the DOM and then update their necessary values
async function getDataFromServer(url = "") {
  const response = await fetch(url);
  const data = await response.json();
  ResultTemp.textContent = data.temperature;
  ResultDate.textContent = data.date;
  ResultContent.textContent = data.userResponse.feelings;
}
