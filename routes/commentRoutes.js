var router = require('express').Router();
var commentDbOperations = require('./../database/commentDbOperations');
const validateReq = require('./../middlewares/Validation.js');

router.post('/addcomment', validateReq, (req, res) => {
    commentDbOperations.addComment(req.body).then(oprRes => {
        res.send(oprRes);
    })
});

router.post('/fetchquestioncomments', validateReq, (req, res) => {
    commentDbOperations.fetchQuestionComments(req.body.quesId).then(oprRes => {
        res.send(oprRes);
    })
});

module.exports = router;