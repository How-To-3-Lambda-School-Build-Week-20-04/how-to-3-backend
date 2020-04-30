const request = require('supertest');
const server = require('../api/server');

describe('likes router', function () {
    describe('POST add likes', function () {
        it('should return 201', async function () {
            const postlike = {
                user_id: 1,
                howto_id: 2
            };
            const response = await request(server).post('/api/likes/').send(postlike);
            expect(response.status).toBe(201)
        })
    })
})