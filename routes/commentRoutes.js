var router = require('express').Router();
var commentDbOperations = require('./../database/commentDbOperations');

router.post('/addcomment', (req, res) => {    
    commentDbOperations.addComment(req.body).then(oprRes=>{
        res.send(oprRes);
    })
});

router.post('/fetchquestioncomments', (req, res) => {    
    commentDbOperations.fetchQuestionComments(req.body.quesId).then(oprRes=>{
        res.send(oprRes);
    })
});

module.exports = router;