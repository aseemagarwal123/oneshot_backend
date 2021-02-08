const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const appRoutes = require('./routes');
const {student} = require('./models/student');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', async (req, res)=>{
  res.status(200).send({'message': 'service is up'});
  // student.findOne({college:"601e833740ebed3d8526bb74"}).then((d)=>{
  //   res.send(d)
  // }).catch((e)=>{
  //   res.send(e)
  // })
});

app.use('/api', appRoutes);

// 404 error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  console.log(err);
  return res.status(err.status || 500).send({'message': err.message || 'Internal Server Error'});
});

module.exports = app;
