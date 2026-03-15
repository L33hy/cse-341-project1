const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Database is already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGO_URL)
        .then((client) => {
            database = client.db();
            return callback(null, database);
        })
        .catch((err) => {
            return callback(err);
        });
}

const getdatabase = () => {
    if (!database) {
        throw new Error('Database not initialized');
    } else {
        return database;
    }
}

module.exports = {
    initDb,
    getdatabase
};