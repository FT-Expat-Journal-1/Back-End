const request = require('supertest'); //initiates supertest
const server = require('../api/server.js') // initiates server
const db = require('../data/dbConfig.js');  // initiates db


describe('Auth-Router Endpoints', () =>{
    //clears out tables before each test and re-seeds
    beforeEach(async  () =>{
        //clears tables
        await db('users').del()
        await db('posts').del()
        //re-seeds
        await db.seed.run();     
    })
    
    test('POST /api/auth/register', async () =>{
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

    test('POST /api/auth/login', async () =>{
        //test user credentials from seed user
        const user = {
            username: 'test_user',
            password: 'password'
        }

        const res = await request(server)
        .post('/api/auth/login')
        .send(user)

        //does it return the expected status code?
        expect(res.status).toBe(200)
        //does it return the expected data format?
        expect(res.type).toMatch(/json/)
        //does it return the expected data?
        expect(res.body.message).toBe('Welcome test_user!')

    })
})