const request = require('request');

const geocode = (address, callback) => {
    const url_geo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2F1cmF2MTUiLCJhIjoiY2tuMzF1NDJ0MWQ1ZzJwbmx1bmdxam04dSJ9.r1DqOyRvpXQc469imc8iSQ';

    request({ url: url_geo, json: true }, (error, res) => {

        if (error) {
            callback('Cannot connect to geocoding service.', undefined);
        } else if (res.body.features == undefined || res.body.features.length == 0) {
            callback("Error Cannot find perticular location.", undefined);
        } else {
            const longitude = res.body.features[0].center[0];
            const latitude = res.body.features[0].center[1];
            const data = { longitude, latitude };
            callback(undefined, data);
        }
    });
}


module.exports = geocode;