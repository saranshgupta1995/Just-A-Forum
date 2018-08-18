const express = require('express');
const http = require('http')
const path = require('path');
const requestLogger = require('./middlewares/RequestLogger.js');
const loginSignupRoutes = require('./routes/loginSignupRoutes.js');
const profileRoutes = require('./routes/profileRoutes.js');
const levelRoutes = require('./routes/levelRoutes.js');
const quesRoutes = require('./routes/questionRoutes.js');
const commentRoutes = require('./routes/commentRoutes.js');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, '/dist/DeSocialize')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/DeSocialize/index.html'));
});

const port = process.env.PORT || 3000;
app.set('port', port);

app.use(requestLogger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(loginSignupRoutes);
app.use(profileRoutes);
app.use(levelRoutes);
app.use(quesRoutes);
app.use(commentRoutes);
app.get('*',(req,res)=>{
    res.redirect('/');
})
const server = http.createServer(app);
server.listen(port, () => console.log('server is now listening'));