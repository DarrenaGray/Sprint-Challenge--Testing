const Games = require('./gamesModel');

describe('games model', () => {
	describe('insert()', () => {
		it('should add a game', async () => {
			await Games.insert({
				title: 'Destiny',
				genre: 'MMO first person shooter',
				releasedYear: '2014'
			});

			const games = await request(Games);

			expect(games).toHaveLength(1);
		});
	});
});
