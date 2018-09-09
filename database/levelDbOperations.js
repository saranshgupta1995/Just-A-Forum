let levelDbOpr = {};
let profileDbOpr = require('./profileDbOperations');

levelDbOpr.dbOpr = require('./dbOperations.js');
levelDbOpr.tableNames = {
    zero: 'LevelZero',
    one: 'LevelOne',
    two: 'LevelTwo',
    three: 'LevelThree',
    four: 'LevelFour',
};
levelDbOpr.tableIndexes = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
};

levelDbOpr.initLevelZero = function (username) {
    return levelDbOpr.dbOpr.insertOneOpr(levelDbOpr.tableNames['zero'], {
        username: username,
        progresses: [0]
    });
}

levelDbOpr.updateProgress = function (username, progresses, level) {
    return levelDbOpr.dbOpr.updateOne(levelDbOpr.tableNames[level], {
        username: username
    }, { $set: { progresses: progresses } });
}

levelDbOpr.setCatchPhrase = function (username, catchPhrase, level) {
    return levelDbOpr.dbOpr.updateOne(levelDbOpr.tableNames[level], {
        username: username
    }, { $set: { catchPhrase } });
}

levelDbOpr.setUserLevel = function (username, level) {
    let dataObj = {
        username: username,
        progresses: [0]
    }
    return levelDbOpr.dbOpr.insertOneOpr(levelDbOpr.tableNames[level], dataObj);
}

levelDbOpr.deleteUserLevel = function (username, level) {
    return levelDbOpr.dbOpr.deleteDoc(levelDbOpr.tableNames[level], {
        username: username,
    });
}

levelDbOpr.findLevelData = function (username, exp_level) {
    return levelDbOpr.dbOpr.findDoc(levelDbOpr.tableNames[exp_level], { username: username }).then(oprRes => {
        if (!oprRes.length) {
            return { 'username': 'not found' };
        } else {
            return oprRes[0]
        }
    });
}

module.exports = levelDbOpr;

