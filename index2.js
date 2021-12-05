const { nextISSTimesForMyLocation, printPasstimes } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPasstimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  })