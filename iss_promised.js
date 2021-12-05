const request = require('request-promise-native');

const fetchMyIP = function () {
  return request('https://api.ipify.org?format=json');
}
const fetchCoordsByIP = function (body) {
  let ip = JSON.parse(body).ip
  return request(`https://freegeoip.app/json/${ip}`);
}

const fetchISSFlyOverTimes = function (body) {
  const { latitude, longitude } = JSON.parse(body);
  const URI = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(URI);
}

const nextISSTimesForMyLocation = function () {
  fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const flyByTime = JSON.parse(data)
      return flyByTime;
    });
};
const printPasstimes = function (flyByTime) {
  for (let i of flyByTime.response) {
    let spotTime = new Date(0);
    spotTime.setUTCSeconds(i.risetime);
    let duration = i.duration;
    console.log(`Next pass at ${spotTime} for ${duration} seconds!`);
  };
};

//nextISSTimesForMyLocation();

module.exports = { nextISSTimesForMyLocation, printPasstimes };