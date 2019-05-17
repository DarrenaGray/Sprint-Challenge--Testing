const express = require('express');

const Games = require('../games/gamesModel');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
	res.status(200).json({ api: 'running' });
});

server.get('/games', async (req, res) => {
	const game = await Games.getAll();

	res.status(200).json(game);
});

server.post('/games', (req, res) => {
	if (req.body.title && req.body.genre && req.body.releasedYear) {
		Games.insert(req.body)
			.then(game => {
				res.status(200).json(game);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	} else {
		res.status(422).json({ message: 'All fields are required.' });
	}
});

module.exports = server;
