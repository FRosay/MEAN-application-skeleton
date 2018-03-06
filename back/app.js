// We’ll declare all our dependencies here
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('./logger');
const config = require('config');

// Database connection 
const db_config = config.DBConfig
mongoose.connect(db_config.prefix + db_config.host + "/" + db_config.name, {});
logger.info("Connecting to database : " + config.DBHost);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Initialize our app variable
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const api = require('./routes/api');
app.use(express.static(path.resolve(__dirname + '/../front/dist')));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../front/dist/index.html'));
});

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
