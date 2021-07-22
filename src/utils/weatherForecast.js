const request = require("request");

const weatherForcast = (latitude, longitude, callback) => {
  //   const url =
  //     "http://api.weatherstack.com/current?access_key=b3dbf7626bf9cc27b793f0db5cde5764&query=" +
  //     address;
  const url =
    "http://api.weatherstack.com/current?access_key=b3dbf7626bf9cc27b793f0db5cde5764&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error)
      callback(
        "Unable to connect to the weather service. Please try again",
        undefined
      );
    else if (body.error) callback("Unable to find the location", undefined);
    else
      callback(
        undefined,
        "The current temparature is " +
          body.current.temperature +
          ". There is " +
          body.current.precip +
          " % of rain."
      );
  });
};

module.exports = weatherForcast;
