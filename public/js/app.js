// Front End

// con il fetch , prendo informazioni dal mio url e le prendo con la response , come un servizio Angular
//*fetch('http://localhost:3000/weather?adress=Boston').then((response)=>{
    // con il json mi vado a prendere i valori della response
    /*response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
        }else{
            console.log(data.location);
            console.log(data.forecast)
        }
    })
})*/

const weatherFrom=document.querySelector('form');
const searchElement=document.querySelector('input');
// con il # prendo id dell'elemento del HTML
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// Assegno un valore di testo a id #message-1
//messageOne.textContent='from javascript'

// il primo argomento è l'evento che deve avvenite , il secondo è una call back dove si possono fare operazioni 
// dopo che si è scatenato l'evento
weatherFrom.addEventListener('submit',(event)=>{
    //Per non far ricaricare la pagina
    event.preventDefault();
    const location = searchElement.value;

    messageOne.textContent='Loading...';
    messageTwo.textContent='';
    fetch('http://localhost:3000/weather?adress='+location).then((response)=>{
    // con il json mi vado a prendere i valori della response
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
            messageOne.textContent=data.error
            messageTwo.textContent=''
        }else{
            console.log(data.location);
            console.log(data.forecast)
            messageOne.textContent=data.location;
            messageTwo.textContent=data.forecast;
        }
    })
})
})