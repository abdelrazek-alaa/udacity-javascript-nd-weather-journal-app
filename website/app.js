/* Global Variables */
const zip = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");
const generateButton = document.querySelector("#generate");
const ResultDate = document.querySelector("#entryHolder #date");
const ResultTemp = document.querySelector("#entryHolder #temp");
const ResultContent = document.querySelector("#entryHolder #content");
let baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&units=metric&appid=YOUR API KEY HERE"; // put your api key here
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
//d.main.temp
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
    });
});

//POST method implementation
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

//Get method implementation
async function getDataFromApi(url = "") {
  const response = await fetch(url);
  return response.json();
}

async function getDataFromServer(url = "") {
  const response = await fetch(url);
  const data = await response.json();
  ResultTemp.textContent = data.temperature;
  ResultDate.textContent = data.date;
  ResultContent.textContent = data.userResponse.feelings;
}
