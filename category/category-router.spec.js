require('dotenv').config();
const request = require('supertest')
const server = require('../api/server.js')
const db = require('../data/dbConfig.js')

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiZWRnYXIiLCJpYXQiOjE1ODgxNzc5ODUsImV4cCI6MTU4ODM1MDc4NX0.4wFH9cHoTpxWCt9O7g4fv3u2P8Z7lwkDMNCRr1_SkwA"

describe('categories router', () => {
  beforeEach(async () => {
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
  }) // end of get

  describe('POST /', () => {
    it('should create a category and assign an ID', async () => {
      return request(server)
        .post('/api/categories')
        .set({ authorization: token })
        .send({
          "name":"General"
        })
        .then(res => {
          expect(res.body.id).toBe(1)
        })
    });
  }) // end of post

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
          .post('/api/categories')
          .set({ authorization: token })
          .send({
            "name":"General"
          })
        })
        .then(() => {
          return request(server)
            .post('/api/categories/1/howto')
            .set({ authorization: token })
            .send({
              "howto_id":"1"
            })
            .then(res => {
              expect(res.body.categories[0].id).toBe(1)
            })
        })
    })
  }) // end of post

  describe('DELETE /:id', () => {
    it('should create a how-to and then attach a category', async () => {
      return request(server)
        .post('/api/howto')
        .set({ authorization: token })
        .send({
          user_id: 1,
          title: "How to Put on a Medical Mask",
          post: "Understand what a medical mask protects you from."
        }) // creates a new how-to
        
        .then(() => {
          return request(server)
          .post('/api/categories')
          .set({ authorization: token })
          .send({
            "name":"General"
          })
        }) // creates a new category
        
        .then(() => {
          return request(server)
            .post('/api/categories/1/howto')
            .set({ authorization: token })
            .send({
              "howto_id":"1"
            })
            .then(res => {
              expect(res.body.categories[0].id).toBe(1)
            }) // assigns category to how-to

        .then(() => {
          return request(server)
            .delete('/api/categories/1')
            .set({ authorization: token })
            .then(res => {
              expect(res.body).toBe(1)
            })
          }) // deletes category and all connections

        })
      })
    }) // end of delete
});