var router = require('express').Router();
var quesDbOperations = require('./../database/questionDbOperations');
const validateReq = require('./../middlewares/Validation.js');

router.post('/addquestion', validateReq, (req, res) => {
    quesDbOperations.fetchQuestionCount().then(oprRes=>{
        quesDbOperations.addQuestion(req.body,oprRes).then(oprRes => {
            res.send(oprRes);
        })
    })
});

router.post('/fetchquestiondata', validateReq, (req, res) => {
    quesDbOperations.getQuestionData(req.body).then(oprRes=>{
        res.send(oprRes[0]);
    })
});

// currently sending tags+question ids -- possible security breach -- bad UX
router.post('/fetchquestiontags', validateReq, (req, res) => {
    quesDbOperations.getQuestionTags(req.body.quesId).then(oprRes=>{
        res.send(oprRes);
    })
});

router.post('/fetchalltags', validateReq, (req, res) => {
    quesDbOperations.getAllTags().then(oprRes=>{        
        res.send(oprRes.map(x => x.tag));
    })
});

module.exports = router;