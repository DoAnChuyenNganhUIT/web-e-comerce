var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var cors = require("cors");
var admin = require("./routes/admin");
const cart = require('./routes/cart');
var index = require("./routes/index");
var usersRouter = require("./routes/users");
var category = require("./routes/category");
var authentication = require("./routes/authentication");
var passport = require("passport");
const purchase = require('./routes/purchase');
var config = require("./configs/database");
const MyImage = require('./routes/MyImage');

//var userRouter = require("./routes/user.router");

global.router = require("express").Router();
var router = global.router;

var app = express();

var mongoose = require("mongoose");
mongoose.Promise = global.Promise; //cho ta xai cu phap then
// var uri = 'mongodb://localhost:27017/CSDL';
var uri =
  "mongodb+srv://cloud1:CmG9wJ3ZWOyOLGrC@cluster0-ubg6z.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri).then(
  () => {
    console.log("Connect to CSDL successful");
  },
  err => {
    console.log(`onnect to CSDL failed: ${err}`);
  }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 600000000 }
}))

app.use(cors({
  origin:['http://localhost:8081'],
  methods:['GET','POST'],
  credentials: true
}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/users", usersRouter);
app.use("/", category);
app.use("/", authentication);
app.use("/", admin);
app.use('/', MyImage);
app.use('/', cart);
app.use('/',purchase)

//app.use("/",userRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.use(passport.initialize());
app.use(passport.session());
//require('./configs/passport')(passport);

app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
