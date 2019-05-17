const db = require('../data/dbConfig');

const Games = require('./gamesModel');

describe('games model', () => {
	beforeEach(async () => {
		await db('games').truncate();
	});
	describe('insert()', () => {
		it('should add a game', async () => {
			await Games.insert({
				title: 'Destiny',
				genre: 'MMO first person shooter',
				releasedYear: '2014'
			});

			const games = await db('games');

			expect(games).toHaveLength(1);
		});
	});
});
