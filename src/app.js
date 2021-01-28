const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoLoc = require('./utils/geocode.js')
const weather = require('./utils/weathercode.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths fro express control
const ViewPublicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const PartialPath = path.join(__dirname, '../templates/partials')

// setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(PartialPath)

// setup static directory to serve
app.use(express.static(ViewPublicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Yash Patel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Yash Patel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Yash Patel',
        help: 'Help is in the way.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address.'
        })
    }
    geoLoc(req.query.address, (error, { Latitude, Longitude, Location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        weather(Latitude, Longitude, (error, forCastData) => {

            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: forCastData,
                Location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search.'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

// Shows error
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yash Patel',
        error: 'Help articel not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yash Patel',
        error: 'Page not Found.'
    })
})

app.listen(port, () => {
    console.log('Server Started at ' + port + '.');
})