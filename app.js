var createError = require('http-errors');
var express = require('express');
const dotenv = require('dotenv')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const csvToJson = require('csvtojson')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


dotenv.config({ path: `.env.local` })
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


const db = require('./models');
db.sequelize.sync().then(() => {
  console.log('Synced db.')

  // try {
  //   csvToJson().fromFile("./data/movies.csv").then(
  //     data => {
  //       db.movies.bulkCreate(data)
  //         .then((items) => {
  //           console.log('movies added successfully')
  //         })


  //     }
  //   )
  //   csvToJson().fromFile("./data/ratings.csv").then(
  //     data => {
  //       db.reviews.bulkCreate(data)
  //         .then((items) => {
  //           console.log('review added successfully')
  //         })


  //     }
  //   )
  // }
  // catch (err) {
  //   console.log("error is " + err)
  // }

})
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)
  })
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
