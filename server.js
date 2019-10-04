const express = require('express')
const fetch = require("node-fetch");
const redis = require('redis')
 
// create express application instance
const app = express()
 
// create and connect redis client to local instance.
const client = redis.createClient(6379)
 
// echo redis errors to the console
client.on('error', (err) => {
    console.log("Error " + err)
});

// initial load on redis
app.get('/ini', (req, res) => {
	
	client.del('ciudad:santiago');
	client.del('ciudad:surich');
	client.del('ciudad:auckland');
	client.del('ciudad:sydney');
	client.del('ciudad:londres');
	client.del('ciudad:georgia');
	
	client.hset('ciudad:santiago', 'latitud', '-33.448891');
	client.hset('ciudad:santiago', 'longitud', '-70.669266');
	
	client.hset('ciudad:surich', 'latitud', '47.376888');
	client.hset('ciudad:surich', 'longitud', '8.541694');
	
	client.hset('ciudad:auckland', 'latitud', '-36.848461');
	client.hset('ciudad:auckland', 'longitud', '174.763336');
	
	client.hset('ciudad:sydney', 'latitud', '-33.868820');
	client.hset('ciudad:sydney', 'longitud', '151.209290');
	
	client.hset('ciudad:londres', 'latitud', '51.507351');
	client.hset('ciudad:londres', 'longitud', '-0.127758');
	
	client.hset('ciudad:georgia', 'latitud', '32.165623');
	client.hset('ciudad:georgia', 'longitud', '-82.900078');
	
	res.writeHead(200, {
		'Content-Type': 'text/plain',
		'Access-Control-Allow-Origin' : '*',
		'Access-Control-Allow-Methods': 'GET'
	});

	return res.end();

});

app.get('/saveForecast', (req, res) => {
	
	res.writeHead(200, {
		'Content-Type': 'application/json; charset=utf-8',
		'Access-Control-Allow-Origin' : '*',
		'Access-Control-Allow-Methods': 'GET'
	});
	
	let response = '{"ciudades": [{"nombre": ';
	const endRes = '}] }';
	
	client.hget('ciudad:santiago', 'latitud', function(err, reply) {
		response = response + '"santiago","latitud": ' + reply;
	});
	
	console.log(response);
	
	client.hget('ciudad:santiago', 'longitud', function(err, reply) {
	response = response + ' ,"longitud": ' + reply + "},{";
	});
	
	client.hget('ciudad:surich', 'latitud', function(err, reply) {
		response = response +' "nombre":' + '"surich","latitud": ' + reply;
	});
	
	client.hget('ciudad:surich', 'longitud', function(err, reply) {
		response = response + ' ,"longitud": ' + reply + "},{";
	});
	
	client.hget('ciudad:auckland', 'latitud', function(err, reply) {
		response = response +' "nombre":' + '"auckland","latitud": ' + reply;
	});
	
	client.hget('ciudad:auckland', 'longitud', function(err, reply) {
		response = response + ' ,"longitud": ' + reply + "},{";
	});
	
	client.hget('ciudad:sydney', 'latitud', function(err, reply) {
		response = response +' "nombre":' + '"sydney","latitud": ' + reply;
	});
	
	client.hget('ciudad:sydney', 'longitud', function(err, reply) {
		response = response + ' ,"longitud": ' + reply + "},{";
	});
	
	client.hget('ciudad:londres', 'latitud', function(err, reply) {
		response = response +' "nombre":' + '"londres","latitud": ' + reply;
	});
	
	client.hget('ciudad:londres', 'longitud', function(err, reply) {
		response = response + ' ,"longitud": ' + reply + "},{";
	});
	
	client.hget('ciudad:georgia', 'latitud', function(err, reply) {
		response = response +' "nombre":' + '"georgia","latitud": ' + reply;
	});
	
	client.hget('ciudad:georgia', 'longitud', function(err, reply) {
		response = response + ' ,"longitud": ' + reply;
		
		console.log(response);
		res.write(response + endRes);
		return res.end();
	});

});

app.listen(3000, () => {
    console.log('Server listening on port: ', 3000)
});