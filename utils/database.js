const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://mongoAtlasUsername:mongoAtlasPassword@e-shopping.0skcntc.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected!');
        _db = client.db()
        callback()
    })  
    .catch(err => {
        console.log(err);
        throw err;   
    })
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No Database Found!'
}

// module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;