const server = require('../api/server.js');
const request = require('supertest');

 describe('server.js', () => {
     it('should set testing environment', () => {
         expect(process.env.DB_ENV).toBe('testing');
     });
 });

 describe('GET /', () => {
     it('returns 200 OK', () => {
         return request(server).get('/')
             .expect(200)
             .expect('Content-Type', /json/);
     });
 }); 