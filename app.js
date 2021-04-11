const express = require('express')
const app = express();
const axios = require ("axios");
const Papa = require('papaparse');
const cors = require('cors');

let apiKeys = {};
getApiKeys();

app.use(cors({
    origin: ['https://juliancavallo.github.io',  'http://127.0.0.1:5501']
}));
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/key', function (req, res) {
    getApiKeys();

    const apiName = req.query.name;
    const obj = apiKeys.find(x => x.name == apiName);

    if(obj)
        res.send(obj);
    else
        res.send({message: "No se encontró la API indicada"})
})
 
app.listen(3000, () => {console.log("corriendo en http://127.0.0.1:3000")})


function getApiKeys(){
    axios.get(
        `https://docs.google.com/spreadsheets/d/e/2PACX-1vQBDiclOSsaFvF1QVBIz43vEKUh4BpH1syw18m91ckw6gkbpkqTt3LoVlHK68au0m2JCaZYAf3NWXhi/pub?output=csv`,
            {
                responseType: 'blob'
            }
        )
        .then((response) => {
            apiKeys = Papa.parse(response.data, {header: true}).data;
            
        });
}