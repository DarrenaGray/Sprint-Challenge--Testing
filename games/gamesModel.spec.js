const request = require('supertest');

const db = require('../data/dbConfig');

const server = require('../api/server');

const Games = require('./gamesModel');

describe('games model', () => {
	afterEach(async () => {
		await db('games').truncate();
	});
	describe('POST /, insert()', () => {
		it('should add a game', async () => {
			await Games.insert({
				title: 'Destiny',
				genre: 'MMO first person shooter',
				releasedYear: '2014'
			});

			const games = await db('games');

			expect(games).toHaveLength(1);
		});

		it('should return 200', async () => {
			await Games.insert({
				title: 'Destiny',
				genre: 'genre',
				releasedYear: '2019'
			});

			const res = await request(server).post('/games');

			expect(res.status).toBe(200);
		});

		it('should return 422 if information is incomplete ', async () => {
			const gameInfo = {
				title: 'Destiny',
				genre: 'genre',
				releasedYear: '2000'
			};

			await db('games').insert(gameInfo);

			const res = await request(server).post('/games');

			expect(res.status).toBe(422);
		});
	});

	describe('GET /, getAll()', () => {
		it('should return 200 status', async () => {
			await Games.getAll();

			const res = await request(server).get('/games');

			expect(res.status).toEqual(200);
		});

		it('should return an array of games from database', async () => {
			request(server).get('/games').then(res => {
				expect(res.type).toEqual('application/json');
			});
		});

		it('should return an empty array if no games are stored', async () => {
			const res = await request(server).get('/games');

			expect(res.body).toEqual([]);
		});
	});
});
