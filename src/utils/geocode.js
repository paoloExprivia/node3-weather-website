const request=require('request')

const geocode = (adress,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+adress+'.json?access_token=pk.eyJ1IjoicGFvZmVub3R2NSIsImEiOiJjbDZkYXY1em4wMWlzM2ltbTNpYndhODF4In0.a3hSkfLlYqJ6OlnvOK4Fyg&limit=1';
    request({url,json:true},(err,{body})=>{
        if(err){
            callback('enabale to connect to service',undefined)
        }else if(body.features.length==0){
            callback('not found location',undefined);
        }else{
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode