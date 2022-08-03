const path = require('path')
const express = require('express')
const hbs = require('hbs')


const request = require('postman-request')
const getGeocode = require('./utils/getGeocode')
const getForecast = require('./utils/getForecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths por Express config
const publicDirectory = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Ciro'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Weather',
        name: 'Ciro'
    })
})


app.get('/help', (req, res)=> {
    res.render('help', {
        title: 'Help',
        message: 'Here, you can find some helpful information about this site.',
        name: 'Ciro'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Please, enter a location.'
        })
    } else {
        getGeocode(req.query.search, (error, {latitude, longitude, place_name} = {}) => {
            if(error){                  
                return res.send({
                    error
                })
            } /*else {
                console.log(latitude, longitude, place_name)
            }*/
    
            getForecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                res.send({
                    forecast: forecastData,
                    address: place_name
                })            
            })    
        })
    }
})

//Should be the last option, if node dont't find nothing, it will run this code
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 - Help Error',
        message: 'Help article not found.',
        name: 'Ciro'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 - Error',
        message: 'Page not found',
        name: 'Ciro'
    })
})


app.listen(port, () => {
    console.log('Server is up on port.' + port)
}) // dvlp 

