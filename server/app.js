var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cors = require('cors');
var index = require('./routes/index');
var usersRouter = require('./routes/users');
var category = require('./routes/category');
var authencation = require('./routes/authencation');
var passport = require('passport');
var config =require('./configs/database');

//var userRouter = require("./routes/user.router");



var app = express();

var mongoose = require('mongoose');
mongoose.Promise= global.Promise;  //cho ta xai cu phap then
mongoose.connect("mongodb://localhost:27017/CSDL").then(
  () => {
    console.log("Connect to CSDL successful")
  },
  err => {
    console.log(`onnect to CSDL failed: ${err}`)
  }
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', usersRouter);
app.use('/',category);
app.use('/',authencation);
//app.use("/",userRouter);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });



app.use(passport.initialize());
app.use(passport.session());
//require('./configs/passport')(passport);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
