
require('dotenv').config();
const request = require('supertest')
const server = require('../api/server.js')
const db = require('../data/dbConfig.js')

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiZWRnYXIiLCJpYXQiOjE1ODgxNzc5ODUsImV4cCI6MTU4ODM1MDc4NX0.4wFH9cHoTpxWCt9O7g4fv3u2P8Z7lwkDMNCRr1_SkwA"


describe('howto router', () => {
  beforeEach(async () => {
    await db('howto').truncate()
  })

  describe('GET /', () => {
    it('should return no how-tos', async () => {
      return request(server)
        .get('/api/howto')
        .set({ authorization: token })
        .then(res => {
          expect(res.body).toHaveLength(0)
        })
    });
  }); // end of get

  describe('POST /', () => {
    it('should return some thicc how-to information after submit', async () => {
      return request(server)
        .post('/api/howto')
        .set({ authorization: token })
        .send({
          "title":"edgar's new how-to",
          "post":"this probably needs more steps",
          "user_id":1
        })
        .then(res => {
          console.log(res.body)
          expect(res.body.id).toBe(1)
          expect(res.body.likes).toBe(0)
          expect(res.body.categories).toHaveLength(0)
        })
    });
  }); // end of post

})