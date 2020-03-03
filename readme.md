# exPat Journal (Back End Code Base)
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

A step by step series of examples that tell you how to get a development environment running
`cd` into `server` folder and install dependencies with:

```
yarn or npm install
```

Then launch the api with: 

```
yarn or npm run server
```
## Table of Contents
- **[Installation](#installing)**<br>
- **[Back End Developer](#backend-developers)**<br>
- **[API Endpoints](#api-endpoints)**<br>
- **[Product Vision Document](#exPat-Journal)**<br>
- **[Proposal](#proposal)**<br>
- **[UX Design](#ux-design)**<br>
- **[Frameworks and Libraries Used](#frameworks-and-libraries)**<br>
- **[Target Audience](#target-audience)**<br>
- **[Research](#research)**<br>
- **[Prototype Key Features](#prototype-key-features)**<br>
- **[Credits](#credits)**<br>

## <a name='overview'></a>Overview
- Explicitly photos for traveling. 
- More professional instagram.

## Back-end Developers
APIS | Relational Database Management Systems and Data Persistence | Authentication | Form Testing
| --------------------- | ---------------------- | --------------------- | -------------------- |

# Product Vision Document :tada:

## exPat Journal

# API Endpoints
Use Base URL: https://expatjournal-api.herokuapp.com/api/auth/login
## Login Endpoint
```js
POST /api/auth/login
```
### Expected Body
```js
{
  "username": "test_user",
  "password": "password"
}
```
### Expected Response
```js
{
    "message": "Welcome test_user!",
    "token": "eyJhbGciOiJIUzI1NuIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJ1c2VybmFtZSI6ImFsZXhpcyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTgzMjA3NTI0LCJleHAiOjE1ODMyMTExMjR9.qUO29mM1WCUnECC2SzYBcWpWHief9wqQVQlMsm3VtZ0"
}
```
## Register Endpoint
```js
POST /api/auth/register
```
### Expected Body
```js
{
  "username": "new_user",
  "password": "password",
  "first_name": "John",
  "last_name": "Doe",
  "email": "JohnDoe@gmail.com"
}
```

### Expected Response
```js
[
    {
        "id": 3,
        "username": "new_user"
    }
]
```

## User Endpoints
### GET All Users
```js
GET /api/users
```
### Expected Header: Authorization Token
```js

{
    "Authorization":"eyJhbGciOiJ4UzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJ1c2VybmFtZSI6ImFsZXhpcyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTgzMjA4NjI0LCJleHAiOjE1ODMyMTIyMjR9.fxBJRx5d6ho4AxqUpFbsXuf6x3X65JqihX65_lzMND4"
}

```
### Expected Response: List of all users in database
```js
[
    {
        "id": 1,
        "username": "test_user",
        "password": "$2a$08$U.yTPF9vnYw54zhXt0iXB.vM4wbkRpsHof40qeBPNutouNjIGfb7S",
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@gmail.com"
    },
     {
        "id": 2,
        "username": "test_user2",
        "password": "$2a$08$U.yTPF9vnYw54zhXt0iXB.vM4wbkRpsHof40qeBPNutouNjIGfb7S",
        "first_name": "Poe",
        "last_name": "Doe",
        "email": "poedoe@gmail.com"
    }
]
```

### GET User By ID
```js
GET /api/users/:id
```
### Expected Header: Authorization Token
```js

{
    "Authorization":"eyJhbGciOiJ4UzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJ1c2VybmFtZSI6ImFsZXhpcyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTgzMjA4NjI0LCJleHAiOjE1ODMyMTIyMjR9.fxBJRx5d6ho4AxqUpFbsXuf6x3X65JqihX65_lzMND4"
}

```
### Expected Response: User that matches ID
```js
{
    "user": {
        "id": 1,
        "username": "test_user",
        "password": "$2a$08$wUjb6eW0gPjfxdScxAr3Ueri3B3KD.x0wWvNvSjKoIeFnD4HLMJMi",
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@gmail.com"
    }
}
```
### UPDATE User by ID
```js
PUT /api/users/:id
```
### Expected Body: 
```js

{
    "username": "test_user",
    "password": "password",
    "first_name": "John",
    "last_name": "Doe",
    "email": "johnsnewemail@gmail.com" //updated field
}

```
### Expected Header: Authorization Token
```js

{
    "Authorization":"eyJhbGciOiJ4UzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJ1c2VybmFtZSI6ImFsZXhpcyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTgzMjA4NjI0LCJleHAiOjE1ODMyMTIyMjR9.fxBJRx5d6ho4AxqUpFbsXuf6x3X65JqihX65_lzMND4"
}

```
### Expected Response:

```js
{
    "success": "updated",
    "id": 1
}
```

### DELETE User by ID
```js
DELETE /api/users/:id
```
### Expected Header: Authorization Token
```js

{
    "Authorization":"eyJhbGciOiJ4UzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJ1c2VybmFtZSI6ImFsZXhpcyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTgzMjA4NjI0LCJleHAiOjE1ODMyMTIyMjR9.fxBJRx5d6ho4AxqUpFbsXuf6x3X65JqihX65_lzMND4"
}

```
### Expected Response:

```js
{
    "success": "deleted",
    "id": 1
}
```



#### Minimal Viable Product (MVP)

1. User can visit site and see photos laid out in a grid
2. Travelers can create, read, update, and delete stories and photos. (No ability to upload one's own photos for MVP)

#### Stretch Goals (Keep in mind this project has to be accomplished in one week)
1. Build an image uploader into the site to allow users the ability to upload their own assets. (This will require some work with a package called Drop Zone and a service called cloudinary).

#### Proposal
- What problem does your app solve?
  * Building a photo-journal app for travelers that allows members to share experiences and anecdotes with fellow travel enthusiasts

- Be as specific as possible; how does your app solve the problem?
  * 
- What is the mission statement? 
  * Travel Far, Travel Often


#### Features
- What features are required for your minimum viable product?
  * User can visit site and see photos laid out in a grid  
  * Travelers can create, read, update, and delete stories and photos. (No ability to upload one's own photos for MVP)

- What features may you wish to put in a future release?
  * Geolocation with photos/posts
  * Messaging/polling 

#### What do the top 3 similar apps do for their users?
1. Main competitors are journal traveling/blogging apps
* Generally provide graphic or written content and the ability to share travel experiences and photos (social media platforms) 




#### UX Design
- What design system will you use?
  * Figma Tool to build out wire frames for design and user flow, color pallete etc.
  * Styled Components
  
###### What is the URL to your wireframes?
 - Figma Wireframe: https://www.figma.com/file/TmGCmqf9QuajGwMTgaaetC/Capture?node-id=266%3A800

  * Tool to pick with : TBD
  * Color palette choice: See figma...
  * Type system: TBD
  * Tool to reference: TBD
  * Typography choice: TBD
  * Icon system:


#### What will your user flow be?
* Register, Login, Lands on the Dashboard, User Profile, Ability to Create Posts, Ability to Update/Delete/Modify, Logout

#### Frameworks and Libraries
- What 3rd party frameworks/libraries are you considering using?

**Frontend:**
* FrontEnd
- Axios
- React
- React-router
- React-strap
- Styled Components
- Redux
* Backend
-Express
-Knex
-Postgres

#### Target Audience

- Who is your target audience? Be specific.
  * Travelers and bloggers that want to share their experiences

- What feedback have you gotten from potential users?
  * No Research done due to no design team.

- Have you validated the problem and your solution with your target audience? How?
  * No Research done due to no design team.

#### Research
_Research thoroughly before writing a single line of code. Solidify the features of your app conceptually before implementation. Spend the weekend researching so you can hit the ground running on Monday._

**Research material:**

#### Prototype Key Features
This is the “bread and butter” of the app, this is what makes your app yours. Calculate how long it takes to implement these features and triple the time estimated. That way you’ll have plenty of time to finish. It is preferred to drop features and spend more time working on your MVP features if needed.

- App Landing Page (nav bar with login and register buttons).
- User Profile (all data needed about user)
- Register (email, password, submit)
- Login (email, password, submit)
- Edit User Profile
- Upload own images 
- Database to store users, login and registration
- Ability to alter profile pic and information
- Ability to add a blog post, API to store posts. Seperate from Photos (Be aware of how CORS will be an issue)


## Credits
### Project Manager
Christine Carpenter https://github.com/CodingCCarpenter <br>

### Backend
Alexis Davalos https://github.com/alexisdavalos <br>

