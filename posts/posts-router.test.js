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
describe("Posts-Router Test Starts", () => {
    it("Should run the test", () => {
        expect(true).toBe(true);
    });
}),

describe('Post-Router Endpoints', () =>{
  
    test('GET to /api/posts', async () =>{ 

        //initialize token for restricted access
        const authorize = await request(server)
        .post('/api/auth/login')
        .send(user)
        //set token from response body
        const token = authorize.body.token;

        //initiate a request to the server
        const res = await request(server)
        //declare endpoint
        .get('/api/posts')
        .set({Authorization: token})
        //does it return the expected status code?
        expect(res.status).toBe(200);
        //does it return the expected data format?
        expect(res.type).toMatch(/json/)
        //does it return the expected data?
        expect(res.body.length).toBe(4); 
    });

    test('GET to /api/posts/:id', async () =>{
    
        //initialize token for restricted access
        const authorize = await request(server)
        .post('/api/auth/login')
        .send(user)
        //set token from response body
        const token = authorize.body.token;

        //initiate a request to the server
        const res = await request(server)
        //declare endpoint
        .get('/api/posts/1')
        //set token to header
        .set({Authorization: token})
        //does it return the expected status code?
        expect(res.status).toBe(200);
        //does it return the expected data format?
        expect(res.type).toMatch(/json/)
        //does it return the expected data?
        expect(res.body.id).toBe(1); 
        expect(res.body.title).toBe('My First Post')
    });

    test('POST to /api/posts', async () =>{
 
        //initialize token for restricted access
        const authorize = await request(server)
        .post('/api/auth/login')
        .send(user)
        //set token from response body
        const token = authorize.body.token;

        //initiate a request to the server
        
        const res = await request(server)
        //declare endpoint
        .post('/api/posts/')
        //set token to header
        .set("authorization", token)
        //send new post body
        .send({
            user_id: 1,
            title: "A New Test Post!",
            body: "Testing Out This App!",
            img_url: "https://imageasdfass.pexels.com/photos/3375997/pexels-photo-3375997.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        })
        //does it return the expected status code?
        expect(res.status).toBe(200);
        //does it return the expected data format?
        expect(res.type).toMatch(/json/)
        expect(Array.isArray(res.body)).toBe(true)
        //does it return the expected data?
        expect(res.body[0].title).toBe('A New Test Post!'); 
    });
    
    test('PUT to /api/posts/:id', async () =>{
       
        //initialize token for restricted access
        const authorize = await request(server)
        .post('/api/auth/login')
        .send(user)
        //set token from response body
        const token = authorize.body.token;
        // initiate a request to the server
        
        const res = await request(server)
        //declare endpoint
        .put('/api/posts/5')
        //set token to header
        .set("authorization", token)
        //send new post body
        .send({
            title: "An Updated Test Post!",
            body: "Testing Out This App!",
            img_url: "https://imageasdfass.pexels.com/photos/3375997/pexels-photo-3375997.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        })
        //does it return the expected status code?
        expect(res.status).toBe(201);
        //does it return the expected data format?
        expect(res.type).toMatch(/json/)
        //does it return the expected data?
        expect(res.body.success).toBe('updated')
        expect(res.body.id).toBe(5)
        expect(res.body.title).toBe('An Updated Test Post!')
        expect(res.body.body).toBe('Testing Out This App!')
        expect(res.body.img_url).toBe('https://imageasdfass.pexels.com/photos/3375997/pexels-photo-3375997.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')
    });

    test('DELETE to /api/posts/:id', async () =>{
    
        //initialize token for restricted access
        const authorize = await request(server)
        .post('/api/auth/login')
        .send(user)
        //set token from response body
        const token = authorize.body.token;
        // initiate a request to the server
        
        const res = await request(server)
        //declare endpoint
        .delete('/api/posts/5')
        //set token to header
        .set("authorization", token)
        //does it return the expected status code?
        expect(res.status).toBe(200);
        //does it return the expected data format?
        expect(res.type).toMatch(/json/)
        //does it return the expected data?
        expect(res.body.success).toBe('deleted')
    });

})