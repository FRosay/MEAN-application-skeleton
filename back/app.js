// We’ll declare all our dependencies here
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');

//Connection to the mongodb database
mongoose.connect('mongodb://localhost/badmintonApp');

//Initialize our app variable
const app = express();

const api = require('./routes/api');
app.use(express.static(path.resolve(__dirname + '/../front/dist')));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
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
