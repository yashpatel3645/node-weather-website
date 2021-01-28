var os = require("os");
request = require('request')

const weather = (Latitude, Longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6ca9e8adb4f3787c931655e1d9bda046&query=' + Latitude + ',' + Longitude

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.success === false) {
            callback('Location not found.', undefined)
        } else {
            callback(undefined, {
                    descriptions: body.current.weather_descriptions[0],
                    temperature: body.current.temperature,
                    feelslike: body.current.feelslike,
                    localtime: body.location.localtime,
                    wind_speed: body.current.wind_speed,
                    uv_index: body.current.uv_index,
                    rain: body.current.precip
                })
                // 'Location: ' + body.current.weather_descriptions[0] + os.EOL + 'Temperature: ' + body.current.temperature +
                //     'C\nFeels Like: ' + body.current.feelslike + 'C\nLocal Time: ' + body.location.localtime + '\nWind Speed: ' + body.current.wind_speed +
                //     '\nUv Index: ' + body.current.uv_index + '\nChance of Rain: ' + (body.current.precip * 100) + '%')
        }
    })
}

module.exports = weather