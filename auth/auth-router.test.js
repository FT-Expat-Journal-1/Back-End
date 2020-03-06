const request = require('supertest'); //initiates supertest
const server = require('../api/server.js') // initiates server
const db = require('../data/dbConfig.js');  // initiates db
const jwt = require('jsonwebtoken')
const {closeConnection} = require('../utils/closeConnection.js')


afterAll(async () =>{
    await db('users').where({username: 'test'}).del()
    await db.destroy();
})
 //initialize test user to register
 const user = {
     username: 'test',
     password: 'password'
 }
 const token = ''
 
 describe("Auth Test Starts", () => {
     it("Should run the test", () => {
         expect(true).toBe(true);
     });
 }),
 
describe('Auth-Router Endpoints', () =>{
    
    test('POST to /api/auth/register', async () =>{
        
        //initiate a request to the server
        const res = await request(server)
        //declare endpoint
        .post('/api/auth/register')
        //send a body
        .send({
            username: "test",
            password: "password",
            first_name: "John",
            last_name: "Snow",
            email: "johnsnow@gmail.com"
        })
        //does it return the expected status code?
        expect(res.status).toBe(200);
        //does it return the expected data format?
        expect(res.type).toMatch(/json/)
        //does it return the expected data?
        expect(res.body[0].username).toBe('test'); 

    })

    test('POST to /api/auth/login', async () =>{
        //initiate a request to the server
        const res = await request(server)
        .post('/api/auth/login')
        .send(user)
        //does it return the expected status code?
        expect(res.status).toBe(200)
        //does it return the expected data format?
        expect(res.type).toMatch(/json/)
        //does it return the expected data?
        expect(res.body.message).toBe('Welcome test!')

    })
    test('Generate JWT Test', async () =>{
        
        const res = await request(server)
        .post('/api/auth/login')
        .send(user)

        //does it return the expected status code?
        expect(res.status).toBe(200)
        //does it return the expected data format?
        expect(res.type).toMatch(/json/)
        //does it return the expected data?
        expect(res.body.message).toBe('Welcome test!')

        //Decode Token from response body
        const decoded = jwt.decode(res.body.token);

        //is the user signed to the token?
        expect(decoded.username).toBe('test')
        
    })

})