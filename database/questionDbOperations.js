let quesDbOpr = {};

quesDbOpr.dbOpr = require('./dbOperations.js');
quesDbOpr.tableName = 'QuestionData';
quesDbOpr.tagsDataTable = 'Tags';

quesDbOpr.addQuestion = function (ques_data, ques_id) {
    ques_data.answerId = 0;
    ques_data.quesId = ques_data.profileId + '.' + (ques_id + 1);
    delete ques_data['profileId'];
    
    let ques_tags=JSON.parse(JSON.stringify(ques_data.tags));
    delete ques_data['tags'];
    quesDbOpr.getAllTags().then(oprRes => {
        tags=(oprRes.map(x => x.tag));
        for (let i=0;i<ques_tags.length;i++){
            if(tags.indexOf(ques_tags[i][0]<0)){
                quesDbOpr.addTags([{ tag: ques_tags[i][0], quesIds: ',' + ques_data.quesId + ',', desc: ques_tags[i][1] }])
            }else{

            }
        }
    })

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