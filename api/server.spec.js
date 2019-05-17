const request = require('supertest');

const server = require('./server');

describe('server', () => {
	describe('GET /', () => {
		it('should return 200 status', async () => {
			const expRes = 200;

			const res = await request(server).get('/');

			expect(res.status).toEqual(expRes);
		});
	});
});
