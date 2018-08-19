let quesDbOpr = {};

quesDbOpr.dbOpr = require('./dbOperations.js');
quesDbOpr.tableName = 'QuestionData';
quesDbOpr.tagsDataTable = 'Tags';

quesDbOpr.addQuestion = function (ques_data, ques_id) {
    ques_data.answerId = 0;
    ques_data.quesId = ques_data.profileId + '.' + (ques_id + 1);
    delete ques_data['profileId'];

    quesDbOpr.addTags([{ tag: 'dev-tasks', quesIds: ','+ques_data.quesId+',' }, { tag: 'real-world-questions', quesIds: ','+ques_data.quesId+',' }])
    return quesDbOpr.dbOpr.insertOneOpr(quesDbOpr.tableName, ques_data);
}

quesDbOpr.getAllTags=function(){
    return quesDbOpr.dbOpr.findDoc(quesDbOpr.tagsDataTable, {})
}

quesDbOpr.addTags=function(tagData){
    return quesDbOpr.dbOpr.insertManyOpr(quesDbOpr.tagsDataTable, tagData)
}

quesDbOpr.fetchQuestionCount = function () {
    return quesDbOpr.dbOpr.fetchCount(quesDbOpr.tableName, {})
}

quesDbOpr.checkQuestionExists = function (ques_data) {
    return quesDbOpr.dbOpr.fetchCount(quesDbOpr.tableName, ques_data);
}

quesDbOpr.getQuestionData = function (ques_data) {
    return quesDbOpr.dbOpr.findDoc(quesDbOpr.tableName, ques_data);
}

quesDbOpr.getQuestionTags = function (quesId) {
    return quesDbOpr.dbOpr.findDoc(quesDbOpr.tagsDataTable, { quesIds: { $regex: new RegExp(`,${quesId},`) } });
}

module.exports = quesDbOpr;