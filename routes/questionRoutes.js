var router = require('express').Router();
var quesDbOperations = require('./../database/questionDbOperations');

router.post('/addquestion', (req, res) => {
    quesDbOperations.fetchQuestionCount().then(oprRes=>{
        quesDbOperations.addQuestion(req.body,oprRes).then(oprRes => {
            res.send(oprRes);
        })
    })
});

router.post('/fetchquestiondata', (req, res) => {
    quesDbOperations.getQuestionData(req.body).then(oprRes=>{
        res.send(oprRes);
    })
});

module.exports = router;