const input = require('./input.json');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const loadMovie = id => axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${process.env.API_KEY}&plot=full`);

const reduceResult = data =>
	data.reduce((acc, {data}) => {
		acc.push(data);
		return acc;
	}, []);

const loadMovies = () => {
	const allRequests = input.map(loadMovie);
	return axios.all(allRequests).then(reduceResult);
};

loadMovies().then(data =>
	fs.writeFileSync(path.join(__dirname, 'output.json'), JSON.stringify(data))
);

