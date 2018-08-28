let dbOperations = {};

dbOperations.database = require('./db.js');

dbOperations.insertOneOpr = function (collection, dataObj) {
    return dbOperations.database.getCollection(collection)
        .then((coll) => {
            return coll.coll.insertOne(dataObj)
                .then((oprRes) => {
                    coll.client.close();
                    return oprRes
                })
        });
}

dbOperations.insertManyOpr = function (collection, dataObj) {
    return dbOperations.database.getCollection(collection)
        .then((coll) => {
            return coll.coll.insertMany(dataObj)
                .then((oprRes) => {
                    coll.client.close();
                    return oprRes
                })
        });
}

dbOperations.fetchCount = function (collection, dataObj) {
    return dbOperations.database.getCollection(collection)
        .then((coll) => {
            return coll.coll.find(dataObj).count().then((oprRes) => {
                coll.client.close();
                return oprRes
            });
        });
}

dbOperations.findDoc = function (collection, dataObj) {
    return dbOperations.database.getCollection(collection)
        .then((coll) => {
            let data = [];
            return coll.coll.find(dataObj).forEach(x => {
                if(x._id){
                    delete x._id;
                }
                data.push(x);
            }).then(oprRes => {
                coll.client.close();
                return data
            })
        });
}

dbOperations.dropCollOpr = function (collection) {
    return dbOperations.database.getCollection(collection)
        .then((coll) => {
            return coll.coll.drop();
        });
}

dbOperations.updateOne = function (collection, findQuery, updateTarget) {
    return dbOperations.database.getCollection(collection)
        .then((coll) => {
            return coll.coll.updateOne(findQuery, updateTarget).then((oprRes) => {
                coll.client.close();
                return oprRes
            });
        });
}

dbOperations.deleteDoc = function (collection, deleteQuery) {
    return dbOperations.database.getCollection(collection)
        .then((coll) => {
            return coll.coll.deleteOne(deleteQuery).then((oprRes) => {
                coll.client.close();
                return oprRes
            });
        });
}

module.exports = dbOperations;

