const request = require('request')

const geoLoc = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZXJ5YXNobXBhdGVsIiwiYSI6ImNra2R1c3NzZjBkaWIybm1udGpsbm9ub2wifQ.bGqyQwCXkRmA2X8E8zOfmg&limit=1"

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect Geographic Service.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to Find Location.', undefined)
        } else {
            callback(undefined, {
                Latitude: body.features[0].center[1],
                Longitude: body.features[0].center[0],
                Location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoLoc