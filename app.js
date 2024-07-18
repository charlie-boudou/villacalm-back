var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require("dotenv").config();

var indexRouter = require('./routes/pictures');
const picturesRouter = require("./routes/pictures");

var app = express();

const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require("./config/cloudinary");
app.use('/', indexRouter);
app.use("/pictures", picturesRouter);

module.exports = app;
