const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const weatherForcast = require("./utils/weatherForecast");

const app = express();

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars engine and views location
// To set the view engine for the handlebars
app.set("view engine", "hbs");

// To set the path for the views to be visible by express
app.set("views", viewsPath);

// For configuring partials inside the handlebars
hbs.registerPartials(partialsPath);

// Setup static directory to serve
// To serve the public folder through Express, we use app.use
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Vishal Juneja",
  }); // The name of the file should match the name of the file which is present in the views folder.
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About the Developer",
    name: "Vishal Juneja",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "Here you will get any help related to the Weather app.",
    name: "Vishal Juneja",
  });
});
// app.get("", (req, res) => {
// This is the message which will be seen by the user when the user visits the particular route.
//   res.send("Hello from Express!!");
// });

// app.get("/help", (req, res) => {
//   // This is the message which will be seen by the user when the user visits the particular route.
//   //   res.send("Help Page");
//   app.use(express.static(publicDirectoryPath + "/help.html"));
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About Page</h1>");
// });

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "Please provide the address to know the weather.",
    });
  }
  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    weatherForcast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help Article 404 Page",
    name: "Vishal Juneja",
    errorMessage: "Sorry!! Help Article page not found.",
  });
});

// Route for 404 Error page
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Error Page",
    name: "Vishal Juneja",
    errorMessage: "Page Not Found",
  });
});

app.listen(3000, () => {
  console.log("Express server is up and running on port 3000");
});
