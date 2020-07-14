function closeConnection(dbName){
    return db(dbName).destroy();
}

module.exports = closeConnection;