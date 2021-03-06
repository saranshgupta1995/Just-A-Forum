let levelController = {};
let profileDbOpr = require('./../database/profileDbOperations')

levelController.checkLevel0 = (data) => true;
levelController.checkLevel1 = (data) => data.worth > 199;
levelController.checkLevel2 = (data) => data.worth > 299;
levelController.checkLevel3 = (data) => data.worth > 699;

levelController.fetchData = (username) => {
    return profileDbOpr.findProfile(username).then(oprRes => {
        return oprRes
    })
}

levelController.runData = (data) => {
    let checkFuncs = ['checklevel0','checkLevel1', 'checkLevel2', 'checkLevel3'];
    let found = false;
    levelDict = {
        0: 'zero',
        1: 'one',
        2: 'two',
        3: 'three'
    }
    for (var func = 1; func <= checkFuncs.length; func++) {
        found = levelController[checkFuncs[func]](data);
        if (!found)
            break
    }
    return levelDict[func - 1]
}

levelController.getLevel = (username, changeObj = {
    worth: 0
}) => {
    return levelController.fetchData(username)
        .then(data => {
            let oldLevel = levelController.runData(data);
            data.worth += changeObj.worth;
            let newLevel = levelController.runData(data);
            return {
                hasChange: oldLevel !== newLevel,
                level: newLevel
            }
        })
}

module.exports = levelController;