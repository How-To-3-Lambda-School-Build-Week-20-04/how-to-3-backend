require('dotenv').config();
const request = require('supertest')
const server = require('../api/server.js')
const db = require('../data/dbConfig.js')

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiZWRnYXIiLCJpYXQiOjE1ODgxNzc5ODUsImV4cCI6MTU4ODM1MDc4NX0.4wFH9cHoTpxWCt9O7g4fv3u2P8Z7lwkDMNCRr1_SkwA"

describe('categories router', () => {
  afterAll(async () => {
    await db('howto_category').truncate()
    await db('category').truncate()
    await db('howto').truncate()
  })

  describe('GET /', () => {
    it('should return no categories', async () => {
      return request(server)
        .get('/api/categories')
        .set({ authorization: token })
        .then(res => {
          expect(res.body).toHaveLength(0)
        })
    });
  });

  describe('POST /', () => {
    it('should return 1 categories', async () => {
      return request(server)
        .post('/api/categories')
        .set({ authorization: token })
        .send({
          "name":"General"
        })
        .then(res => {
          expect(res.body).toHaveLength(1)
        })
    });
  });

  describe('POST /:id/howto', () => {
    it('should create a how-to and then attach a category', async () => {
      return request(server)
        .post('/api/howto')
        .set({ authorization: token })
        .send({
          user_id: 1,
          title: "How to Put on a Medical Mask",
          post: "Understand what a medical mask protects you from."
        })
        .then(() => {
          return request(server)
            .post('/api/categories/1/howto')
            .set({ authorization: token })
            .send({
              "howto_id":"1"
            })
            .then(res => {
              expect(res.body.categories).toHaveLength(1)
            })
        })
    })
  });

  describe('DELETE /:id', () => {
    it('should remove a category and any connections', async () => {
      return request(server)
        .delete('/api/categories/1')
        .set({ authorization: token })
        .then(res => {
          expect(res.body).toBe(1)

          return request(server)
            .get('/api/categories/1/howto')
            .set({ authorization: token })
            .then(res => {
              expect(res.text).toContain('not found')
            })
        })
    })
  })

});