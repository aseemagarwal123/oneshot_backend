/* eslint-disable linebreak-style */
const router = require('express').Router();
const collegeRoute = require('./routes/collegeRoute');
router.use('/v1/college', collegeRoute);

module.exports = router;
