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
        title: 'Weather App!',
        name: 'Ciro'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Ciro'
    })
})


app.get('/help', (req, res)=> {
    res.render('help', {
        title: 'What',
        message: 'This is some helpful text',
        name: 'Ciro'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'An Address provided by you must be, little padawan'
        })
    } else {
        getGeocode(req.query.search, (error, {latitude, longitude, location} = {}) => {
            if(error){                  
                return res.send({
                    error
                })
            }
    
            getForecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                res.send({
                    forecast: forecastData,
                    address: req.query.search
                })            
            })    
        })
    }
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
      products: []  
    })
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


// app.com
//http://localhost:3000
//app.com/help
//http://localhost:3000/help
//app.com/about
//http://localhost:3000/about

/*

app.get('', (req, res) => {
    res.send('Express')
})

app.get('/help', (req, res) => {
    res.send({
        name: 'Andrew',
        age: 45
    })
})

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>')
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is raining outside',
        location: 'Surely you are in Curitiba'
    })
})
*/


app.listen(port, () => {
    console.log('Server is up on port.' + port)
}) // dvlp 

