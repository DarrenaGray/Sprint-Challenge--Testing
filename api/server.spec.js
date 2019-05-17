const request = require('supertest');

const server = require('./server');

describe('server', () => {
	describe('GET /', () => {
		it('should return 200 status', async () => {
			const expRes = 200;
			const res = await request(server).get('/');
			expect(res.status).toEqual(expRes);
		});

		it('should return JSON using done callback', done => {
			request(server).get('/').then(res => {
				expect(res.type).toBe('application/json');
				done();
			});
		});
		it('should return { api: "running" }', () => {
			const expected = { api: 'running' };
			return request(server).get('/').then(res => {
				expect(res.body).toEqual(expected);
			});
		});
	});
});
