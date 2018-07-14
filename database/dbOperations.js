let dbOperations = {};

dbOperations.database = require('./db.js');

dbOperations.insertOneOpr = function (collection,dataObj) {
    return dbOperations.database.getCollection(collection)
        .then((coll) => {
            return coll.coll.insertOne(dataObj)
                .then((oprRes) => {
                    coll.client.close();
                    return oprRes.insertedCount == 1
                })
        });
}

dbOperations.findOpr = function (collection,dataObj) {
    return dbOperations.database.getCollection(collection)
        .then((coll) => {
            return coll.coll.find(dataObj).count().then((oprRes) => {
                coll.client.close();
                return oprRes > 0
            });
        });
}

module.exports = dbOperations;

