const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url_weather = 'http://api.weatherstack.com/current?access_key=b2fdba7d4385739f81057d4b95424506&query=' + latitude + ',' + longitude;

    request({ url: url_weather, json: true }, (error, res) => {
        if (error) {
            callback('Cannot connect to weather service', undefined);
        } else if (res.body.error) {
            callback("Location you requested cannot be found !",undefined);
        } else {
            callback(undefined,res.body.current.temperature);
        }
    })
}

module.exports = forecast;