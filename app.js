const express = require('express');
const http = require('http')
const path = require('path');
const requestLogger = require('./middlewares/RequestLogger.js');
const loginSignupRoutes = require('./routes/loginSignupRoutes.js');
const profileRoutes = require('./routes/profileRoutes.js');
const levelRoutes = require('./routes/levelRoutes.js');
const quesRoutes = require('./routes/questionRoutes');
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
const server = http.createServer(app);
server.listen(port, () => console.log('running'));

// const express = require('express');
// const app = express();
// const requestLogger = require('./middlewares/RequestLogger.js');
// const routes = require('./routes/routes.js');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// app.use(requestLogger);
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());
// app.use(routes);

// app.listen(3000, () => console.log('Example app listening on port 3000!'));