const request = require('supertest')
const server = require('../api/server.js')
const db = require('../data/dbConfig.js')

describe('server', function() {
  afterAll(async () => {
    await db('user').truncate()
  })

  describe('GET /', () => {
    it('should return 200', () => {
      // make a GET request to / endpoint
      return request(server) // return async call to let jest know it should wait
      .get('/')
      .then(res => {
        // assert that the status code is 200
        expect(res.status).toBe(200)
      })
    })
  });

  describe('POST /api/auth/register', () => {
    it('adds a new user and gets 201', () => {
      return request(server)
        .post('/api/auth/register')
        .send({
          username: 'edgar',
          password: '123abc',
          email: 'life_of_edgar@gmail.com'
        })
        .then(res => {
          expect(res.status).toBe(201)
        })
    });

  }); // end of REGISTER

  describe('POST /api/auth/login', async () => {
    it('gets a token back on login', () => {
      return request(server)
        .post('/api/auth/login')
        .send({
          username: 'edgar',
          password: '123abc'
        })
        .then(res => {
          expect(res.body.token).toBeTruthy()
        })
    })

    it('rejects bad login information', async () => {
      return request(server)
      .post('/api/auth/login')
      .send({
        username: 'edgar',
        password: '123abd'
      })
      .then(res => {
        expect(res.status).toBe(401)
      })
    })
  }); // end of LOGIN
});