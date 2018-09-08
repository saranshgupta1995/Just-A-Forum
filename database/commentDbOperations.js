let commentDbOperations = {};
//iukyjghfvd
commentDbOperations.dbOpr = require('./dbOperations.js');
commentDbOperations.tableName = 'Comments';

commentDbOperations.addComment = function (comment_data) {    
    comment_data.commentId = comment_data.quesId + '.' + (comment_data.commentId + 1);
    comment_data.relevancy = 0;
    delete comment_data['quesId'];
    return commentDbOperations.dbOpr.insertOneOpr(commentDbOperations.tableName, comment_data);
}

commentDbOperations.fetchCommentCount = function () {
    return commentDbOperations.dbOpr.fetchCount(commentDbOperations.tableName, {})
}

commentDbOperations.fetchQuestionComments = function (quesId) {
    return commentDbOperations.dbOpr.findDoc(commentDbOperations.tableName, { commentId: { $regex: new RegExp('^'+quesId) } })
}

commentDbOperations.getCommentData = function (comment_data) {
    return commentDbOperations.dbOpr.findDoc(commentDbOperations.tableName, comment_data);
}

module.exports = commentDbOperations;