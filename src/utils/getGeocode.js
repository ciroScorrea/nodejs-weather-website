const request = require('postman-request')

const getGeocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +  '.json?access_token=pk.eyJ1IjoiY2lyb2FzY29ycmVhIiwiYSI6ImNrazkxNG1zMTBjYjAyb3F3MWZxcXlxazcifQ.DqgLhaQa6C3iLV98vOGN3A&limit=1'
    request({ url, json: true}, (error, {body} ={}) => { //{body} is desestructuring response.body
        if(error){
            callback('unable to connect' , undefined)
        } else if(body.features.length === 0) {
            callback('Place not found', undefined)
        } else {
            const data = body
            callback(undefined, {
                latitude: data.features[0].center[1], 
                longitude: data.features[0].center[0],
                place_name: data.features[0].place_name
            })
        }

    })

}

module.exports = getGeocode

