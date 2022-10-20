// Back End
const path = require('path')
const exspress = require('express');
const { hasSubscribers } = require('diagnostics_channel');
const hbs = require('hbs');
const { rmSync } = require('fs');

const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast')

//Per vedere dove si sta eseguendo la nostra applicazione
// port prendere il valore da process.env.PORT se esiste o altrimenti prende il valore da 3000
const port = process.env.PORT || 3000;

// __dirname --> percorso della directory in cui è contenuto il file
//console.log(__dirname);
// __filename --> percorso del file
//console.log(path.join(__dirname,'../public'))
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// Associo a una variabile , il metodo exspress che ho richiesto
const app = exspress()

// Specifica la directory dei miei file 
app.use(exspress.static(publicDirectoryPath));

// Per utilizzare hbs , quindi l'interpolazione tra il nostro back end e il nostro front end
// Quata engine va a prendere i file hbs dalla cartella views del progetto
app.set('view engine','hbs')
app.set('views',viewsPath)
//Serve per registrare il nostro partials
hbs.registerPartials(partialsPath)

// PER LA VISUALIZZAZIONE DELLA NOSTRO PAGINA DINAMICA CON HENDLERBARS
app.get('',(req,res)=>{
    // La funzione render serve per renderizzare una pagina dinamica
    // Argomenti render : ('nome file .hbs' , dati che vogliamo trasmettere)
    res.render('index',{
        title : "Weather App",
        name : "Paolo"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Paolo Marcolongo'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText:'This is a help text',
        name :'Paolo Marcolongo'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.adress){
        return res.send({
            error:'You mus provide an Adress'
        })
    }

    geocode(req.query.adress,(error , { latitude,longitude,location}={})=>{
        if(error){
            res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                res.send({error})
            }

            res.send({
                forecast:forecastData,
                location:location,
                adress:req.query.adress
            })
        })
    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    // req.query = prende i valori della mia query creata tramite url
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Eror 404',
        errroMessage:'Help article not found',
        name:'Paolo Marcolongo'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'Eror 404',
        errroMessage:'My page not found',
        name:'Paolo Marcolongo'
    })
})

// Come primo argomento del nostro metodo get mettiamo url , come secondo metodo (richiesta , risposta)
/*app.get('/help',(req,res)=>{

    // la funzione send serve per inviare i dati 
    res.send([{
        name:'Paolo',
    },
    {
        name:'Lucia'
    }])

})*/

/*app.get('/about',(req,res)=>{
    res.send('<h1>About</h1>')
})*/

/*app.get('/weather',(req,res)=>{
    res.send({
        forecast:'It is snowing',
        location:'Manfredonia'
    })
})*/
// Porta in cui noi ci colleghiamo per visualizzare i nostri risultati
app.listen(port,()=>{
    console.log('Server start in port '+ port)
})