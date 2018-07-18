var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI;


let data = {};

data.getCollection = function (coll) {
    return MongoClient.connect(url, { useNewUrlParser: true }).then(function (client) {
        console.log('connected to db');
        return {
            "client": client,
            "coll": client.db('heroku_f7j5lj97').collection(coll)
        }
    });
}

module.exports = data;

// Create DB

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     db.close();
// });

// Create/Insert
// MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
//     var myDb = client.db('DSCLZE');
//     // myDb.createCollection("LoginDetails");
//     myDb.collection('LoginDetails').insertOne({ "userName": "Saransh" });

// });

// Find
// MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
//     var myDb = client.db('DSCLZE');
//     // myDb.createCollection("LoginDetails");
//     myDb.collection('LoginDetails').find({ "userName": "Saransh" }).forEach(x => console.log(x));
//     client.close();
// });

// Delete Many
// myDb.collection('LoginDetails').deleteMany({});

// Insert into DB

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     var myobj = { name: "Company Inc", address: "Highway 37" };
//     dbo.collection("customers").insertOne(myobj, function (err, res) {
//         if (err) throw err;
//         console.log("1 document inserted");
//         db.close();
//     });
// });

// Find One in DB

// var MongoClient = require('mongodb').MongoClient;
// let url = 'mongodb://localhost:27017';

// MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
//     if (err) throw err;

//     var dbo = db.db("mydb");
//     dbo.collection("customers").findOne({}, function (err, result) {
//         if (err) throw err;
//         console.log(result.name);
//         db.close();
//     });
// });
