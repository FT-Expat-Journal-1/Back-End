const request = require('supertest'); //initiates supertest
const server = require('../api/server.js') // initiates server
const db = require('../data/dbConfig.js');  // initiates db
const jwt = require('jsonwebtoken')

afterAll(async ()=>{  
   await db.destroy();
})

//initialize test user credentials from seed user
const user = {
    username: 'test_user',
    password: 'password'
}

describe("Users-Router Test Starts", () => {
    it("Should run the test", () => {
        expect(true).toBe(true);
    });
}),


describe('Users-Router Endpoints', () =>{

    test('GET to /api/users', async () =>{ 
        //initialize token for restricted access
        const authorize = await request(server)
        .post('/api/auth/login')
        .send(user)
        //set token from response body
        token = authorize.body.token;

        //initiate a request to the server
        const res = await request(server)
        //declare endpoint
        .get('/api/users')
        .set("authorization", token)
        //does it return the expected status code?
        expect(res.status).toBe(200);
        //does it return the expected data format?
        expect(res.type).toMatch(/json/)
        //does it return the expected data?
        expect(res.body[0].username).toBe('test_user'); 
        expect(res.body[0].first_name).toBe('John')
        expect(res.body[0].last_name).toBe('Doe')
        expect(res.body[0].email).toBe('johndoe@gmail.com')
    });

    test('GET to /api/users/:id', async () =>{
        // initialize token for restricted access
        const authorize = await request(server)
        .post('/api/auth/login')
        .send(user)
        //set token from response body
        const token = authorize.body.token;

        // initiate a request to the server
        const res = await request(server)
        //declare endpoint
        .get('/api/users/1')
        //set token to header
        .set("authorization", token)
        //does it return the expected status code?
        expect(res.status).toBe(200);
        //does it return the expected data format?
        expect(res.type).toMatch(/json/)
        //does it return the expected data?
        expect(res.body.username).toBe('test_user'); 
        expect(res.body.first_name).toBe('John')
        expect(res.body.last_name).toBe('Doe')
        expect(res.body.email).toBe('johndoe@gmail.com')
    });

    test('GET to /api/users/:id/posts', async () =>{
       // initialize token for restricted access
       const authorize = await request(server)
       .post('/api/auth/login')
       .send(user)
       //set token from response body
       const token = authorize.body.token;
        
        const res = await request(server)
        //declare endpoint
        .get('/api/users/1/posts')
        //set token to header
        .set("authorization", token)
        //does it return the expected status code?
        expect(res.status).toBe(200);
        //does it return the expected data format?
        expect(res.type).toMatch(/json/)
        expect(Array.isArray(res.body)).toBe(true);
        //does it return the expected data?
        expect(res.body).toHaveLength(4)
        expect(res.body[0].title).toBe('My First Post')
        expect(res.body[0].body).toBe('This is one of my very first trips shared on Capture!')
    
    });

    test('DELETE to /api/users/:id', async () =>{
        //initialize token for restricted access
        const authorize = await request(server)
        .post('/api/auth/login')
        .send(user)
        //set token from response body
        const token = authorize.body.token;
        // initiate a request to the server

        const res = await request(server)
        //declare endpoint
        .delete('/api/users/1')
        //set token to header
        .set("authorization", token)
        //does it return the expected status code?
        expect(res.status).toBe(200);
        //does it return the expected data format?
        expect(res.type).toMatch(/json/)
        //does it return the expected data?
        expect(res.body.success).toBe('deleted')
        expect(res.body.id).toBe(1)
    });

})