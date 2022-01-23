const express = require('express');
const app = express();

const PORT = 3000

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

app.listen(PORT, console.log(`listening on ${PORT}`));
