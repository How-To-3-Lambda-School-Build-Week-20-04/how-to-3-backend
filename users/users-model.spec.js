const request = require('supertest')
const server = require('../api/server.js')
const db = require('../data/dbConfig.js')

describe('server', function() {
  beforeEach(async () => {
    await db('user').truncate()
  })

  describe('POST /api/auth/register', () => {
    it('adds a new user and gets 201', () => {
      return request(server)
        .post('/api/auth/register')
        .send({
          username: 'edgar',
          password: '123abc',
          email: 'edgars_story@gmail.com'
        })
        .then(res => {
          expect(res.status).toBe(201)
        })
    });
  }); // end of REGISTER

  describe('POST /api/auth/register', () => {
    it('does not add a user with a bad email address', () => {
      return request(server)
        .post('/api/auth/register')
        .send({
          username: 'edgar',
          password: '123abc',
          email: 'edgars_storygmail.com'
        })
        .then(res => {
          expect(res.status).toBe(400)
        })
    });
  }); // end of bad REGISTER

  describe('POST /api/auth/login', () => {
    it('gets a token back on login', async () => {
      return request(server)
      .post('/api/auth/register')
      .send({
        username: 'edgar',
        password: '123abc',
        email: 'edgars_story@gmail.com'
      })
      .then(() => {
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
    }) 
  }) // end of login

  describe('POST /api/auth/login', () => {
    it('fails to log in with bad information', async () => {
      return request(server)
      .post('/api/auth/register')
      .send({
        username: 'edgar',
        password: '123abc',
        email: 'edgars_story@gmail.com'
      })
      .then(() => {
        return request(server)
          .post('/api/auth/login')
          .send({
            username: 'edgar',
            password: '123ab'
          })
          .then(res => {
            expect(res.body.error).toBeTruthy()
          })
      })
    }) 
  }) // end of bad login
});