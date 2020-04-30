require('dotenv').config();
const request = require('supertest')
const server = require('../api/server.js')
const db = require('../data/dbConfig.js')

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiZWRnYXIiLCJpYXQiOjE1ODgxNzc5ODUsImV4cCI6MTU4ODM1MDc4NX0.4wFH9cHoTpxWCt9O7g4fv3u2P8Z7lwkDMNCRr1_SkwA"


describe('howto router', () => {
  afterAll(async () => {
    /* await db('likes').truncate()
    await db('howto_category').truncate()
    await db('category').truncate()
    */
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
  });

})