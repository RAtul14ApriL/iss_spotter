const request = require("request");

const apiURL = 'https://api.ipify.org?format=json';

const fetchMyIP = function (callback) {
  request(apiURL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (body) {
      const { longitude, latitude } = JSON.parse(body);
      callback(null, { latitude, longitude });
    }
  });
};

const fetchISSFlyOverTimes = function (coordinates, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyby data for coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (body) {
      const flybyData = JSON.parse(body);
      callback(null, flybyData);
    }
  });
};


const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(location, (error, flybyData) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, flybyData);
      });
    });
  });
};

//fetchISSFlyOverTimes(undefined);
module.exports = nextISSTimesForMyLocation;