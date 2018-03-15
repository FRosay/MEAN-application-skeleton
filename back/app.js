// We’ll declare all our dependencies here
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('./logger');
const config = require('config');
const jobs = require('./jobs/jobs');
const async = require('async');

// Database connection 
const db_config = config.DBConfig
mongoose.connect(db_config.prefix + db_config.host + "/" + db_config.name, {});
logger.info("Connecting to database : " + config.DBHost);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Initialize our app variable
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT")
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

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../front/dist/index.html'));
});

jobs.start();



module.exports = app;
