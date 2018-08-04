let quesDbOpr = {};

quesDbOpr.dbOpr = require('./dbOperations.js');
quesDbOpr.tableName = 'QuestionData';

quesDbOpr.addQuestion = function (ques_data, ques_id) {
    ques_data.answerId = 0;
    ques_data.quesId = ques_data.profileId+'.'+(ques_id + 1);
    delete ques_data['profileId'];
    return quesDbOpr.dbOpr.insertOneOpr(quesDbOpr.tableName, ques_data);
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

quesDbOpr.addComment = function (ques_data, comment_data) {
    return quesDbOpr.dbOpr.updateOne(quesDbOpr.tableName, ques_data, { $set: comment_data });
}

module.exports = quesDbOpr;