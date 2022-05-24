require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors=require('cors');
const errorHandler=require('./middlewares/errorHandler');

const indexRouter = require('./routes/index');
const authRouter=require('./routes/auth');
const profileRouter=require('./routes/profile');

const app = express();
app.use(cors());
mongoose.connect(process.env.MONGO_URI);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.route('/api/login')
//     .post(loginRoute);
app.use('/', indexRouter);
app.use('/api',authRouter);
app.use('/api/profile',profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
