const request=require('request')

const forecast = (latidute,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/forecast?access_key=2a610eb2ea66fcced07136732f403643&query='+longitude+','+latidute+'&units=f'
   // DI SOLITO AL POSTO DEL {body} c'è la response
    request({url,json:true},(err,{body})=>{
        
        if(err){
            callback('enabale to connect to service',undefined);
        }else if(body.forecast==null){
            callback('not found location',undefined);
        }else{
            callback(undefined,'Weather Describ '+body.current.weather_descriptions[0]+
            ' The temperature is '+body.current.temperature+'° '+
            ' The precipitation is '+body.current.feelslike+'%')
        }
    })
}

module.exports=forecast