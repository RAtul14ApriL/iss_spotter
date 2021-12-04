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

// flybyData= {
//   response: [
//     { risetime: 1638712265, duration: 528 },
//     { risetime: 1638748665, duration: 373 },
//     { risetime: 1638785065, duration: 196 },
//     { risetime: 1638821465, duration: 664 },
//     { risetime: 1638857865, duration: 228 }
//   ]
// }
