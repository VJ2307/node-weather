console.log("Client side javascript file is loaded and is ready to run.!!");

// Selecting the form element
const weatherForecast = document.querySelector("form");

// selecting the input element
const search = document.querySelector("input");

const messageOne = document.querySelector("#firstParagraph");
const messageTwo = document.querySelector("#secondParagraph");

if (weatherForecast) {
  weatherForecast.addEventListener("submit", (e) => {
    e.preventDefault(); // made the developer handle each and everything!!
    if (search) {
      const location = search.value;
      console.log("Location : " + location);

      messageOne.textContent = "Weather Loading........";
      messageTwo.textContent = "";

      // Using fetch API to fetch the weather forecast from the backend to the client-side.
      const url = "http://localhost:3000/weather?address=" + location;
      fetch(url).then((response) => {
        response.json().then((data) => {
          if (!data.error) {
            messageOne.textContent = "Weather Forecast is " + data.forecast;
            messageTwo.textContent = "Location is " + data.location;
          } else
            messageOne.textContent =
              "Some error has occured which is " + data.error;
        });
      });
    } else console.log("No element named search in the page.");
  });
} else {
  console.log("There is no form element in the page.");
}
