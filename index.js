const express = require('express');
const app = express();
const superagent = require('superagent');

const PORT = 3000
const { polygon_api_key } = require('./credentials.js');

const temperatures = {
el_paso: 39,
	 austin: 43,
	 san_antonio: 50,
	 dallas: 36,
	 houston: 41
};

function canonicalize(string) {
	let ucfc = string.charAt(0).toUpperCase() + string.slice(1);
	return ucfc.replace('/_/g', ' ');
}

app.get('/', (req, res) => {
		console.log("handling request...");
		res.send('hello world!');
		});

app.get('/weather/:city', (req, res) => {
		console.log(`We're processing a request for city: ${req.params.city}`);
		res.send(`The weather in ${canonicalize(req.params.city)} is ${temperatures[req.params.city]} degrees Fahrenheit.`);
		}); 
app.get('/stocks/:ticker', (req, res) => {
		(async () => { 
		 const url_to_query = `https://api.polygon.io/v2/aggs/ticker/${req.params.ticker.toUpperCase()}/prev?adjusted=true&apiKey=${polygon_api_key}`;
		 const api_res = await superagent.get(url_to_query);
		 (async() => {
		  const meta_url = `https://api.polygon.io/v1/meta/symbols/${req.params.ticker.toUpperCase()}/company?apiKey=${polygon_api_key}`;
		  const meta_res = await superagent.get(meta_url);
		  res.send(`
				  <img src="${meta_res.body.logo}" /> 
				  <h1>${meta_res.body.name} (${req.params.ticker.toUpperCase()})</h1>
				  <h3>Last closed price: ${api_res.body.results[0].c}</h3>
				  <h3>Exchange: ${meta_res.body.exchange}</h3>
				  <h3></h3>
				  `);
		  })();
		 })();
		});

app.listen(PORT, console.log(`listening on ${PORT}`));
