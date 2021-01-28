const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const LocationWithError = document.querySelector('#LocationWithError')
const temperature = document.querySelector('#temp')
const feelslike = document.querySelector('#feelslike')
const descriptions = document.querySelector('#descriptions')
const rain = document.querySelector('#rain')
const wind_speed = document.querySelector('#wind_speed')
const uv_index = document.querySelector('#uv_index')
const localtime = document.querySelector('#localtime')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    LocationWithError.textContent = 'Loading....'
    const location = search.value
    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                LocationWithError.textContent = 'Error: ' + data.error
                temperature.textContent = ''
                feelslike.textContent = ''
                descriptions.textContent = ''
                rain.textContent = ''
                wind_speed.textContent = ''
                uv_index.textContent = ''
                localtime.textContent = ''
            } else {
                LocationWithError.textContent = 'Location: ' + data.Location
                temperature.textContent = 'Temperature: ' + data.temperature
                feelslike.textContent = 'Feels Like: ' + data.feelslike
                descriptions.textContent = 'Weather: ' + data.descriptions
                rain.textContent = 'Chances of Rain: ' + data.rain
                wind_speed.textContent = 'Wind Speed: ' + data.wind_speed
                uv_index.textContent = 'Uv Index: ' + data.uv_index
                localtime.textContent = 'Local Time: ' + data.localtime
            }
        })
    })
})