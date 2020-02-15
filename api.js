const OAuth = require('oauth');
const appInfo =  require('./credentials');
const header = {
    "X-Yahoo-App-Id": appInfo.appId
};
const request = new OAuth.OAuth(
    null,
    null,
    appInfo.cKey,
    appInfo.cSecret,
    '1.0',
    null,
    'HMAC-SHA1',
    null,
    header
);

module.exports = request;

// function getWeatherOfCity(city){
//     city = city ? city: "sunnyvale"
//     request.get(
//         `${appInfo.baseURI}?location=${city}&format=json`,
//         null,
//         null,
//         function (err, data, result) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log("\n *******--------------******** \n",data)
//             }
//         }
//     );
// }


// var apiObj = {
//     getByCityName : getWeatherOfCity
// }

// module.exports = apiObj;