var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const Nations = require('./models/nation');
const Dishes = require('./models/players');

const url = 'mongodb://127.0.0.1:27017/worldcup2022';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var nationsRouter = require('./routes/nationsRouter')
var playersRouter = require('./routes/playersRouter')

var app = express();

//Connect to database
// connect.then((db) => {
//   console.log('Connected to database');
//   Nations.create({
//     name: 'Quatar7',
//     description: 'Home town'
//   }).then((nation) => {
//     console.log(nation);
//     return Nations.findByIdAndUpdate(nation._id, {
//       $set: {
//         description: 'WC2022'
//       },
//       new: true,
//     }).exec();
//   }).then((nation) => {
//     console.log(nation);
//     nation.comments.push({
//       rating: 5,
//       comment: 'Please give me beer!',
//       author: 'Hacker'
//     });
//     return nation.save();
//   }).then((nation) => {
//     console.log(nation);
//     return Nations.deleteOne({});
//   }).then((nation) => {
//     return mongoose.connection.close();
//   }).catch((err) => {
//     console.log(err);
//   });
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/nations', nationsRouter);
app.use('/players', playersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
