const nextISSTimesForMyLocation = require('./iss');

const printData = function(flybyData) {
  for (let i of flybyData.response) {
    let spotTime = new Date(0);
    spotTime.setUTCSeconds(i.risetime);
    let duration = i.duration;
    console.log(`Next pass at ${spotTime} for ${duration} seconds!`);
  };
};

nextISSTimesForMyLocation((error, flybyData) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  } else {
    printData(flybyData);
  };
});