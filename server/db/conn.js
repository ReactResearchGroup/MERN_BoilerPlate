const { MongoClient } = require("mongodb");
const Db = "mongodb://127.0.0.1:27017";
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (db) {
                _db = db.db("employees");
                console.log("successfully connected to MongoDB.");
            }
            return callback(err);
        });
    },
    getDb: function() {
        return _db;
    }
}