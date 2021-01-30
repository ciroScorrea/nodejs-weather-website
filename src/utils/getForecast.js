const request = require('postman-request')

getForecast = (latitude, longitude, callback) => {
    const url  = 'http://api.weatherstack.com/current?access_key=0a050ac93067ac841914cb49c14e5750&query='+(latitude)+','+(longitude)+'&units=m'
    request({url, json: true},  (error, {body} ={}) =>{//{body} is desestructuring response.body
        if(error){
            callback('unable to connect to weatherstack', undefined)
        } else if (body.success == false) {
            callback('Ocorreu o seguinte erro ' + body.error.info, undefined)
        } else {
            const data = body.current
            callback(undefined, data.weather_descriptions[0] + '. It is currently ' + data.temperature + ' degress out. It feels like ' + data.feelslike + ' degrees out. Humidity: ' + data.humidity)
        }       
    })
}

module.exports = getForecast