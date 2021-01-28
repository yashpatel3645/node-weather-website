request = require('request')

const weather = (Latitude, Longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6ca9e8adb4f3787c931655e1d9bda046&query=' + Latitude + ',' + Longitude

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.success === false) {
            callback('Location not found.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature +
                ' degree celsius and It feels like ' + body.current.feelslike + ' degree outside.')
        }
    })
}

module.exports = weather