const path = require('path')
const express = require('express')
//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname, '../public'))

const app = express()

const publicDirectory = path.join(__dirname, '../public/')
app.use(express.static(publicDirectory))


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


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
}) // dvlp 

