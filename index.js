require("dotenv").config(); //access to .env variables
const server = require('./api/server.js');
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`\n*** Server is listening on port ${PORT} *** \n** Welcome Neo **\n`)
})