const createError = require('http-errors');
const {college} = require('../models/college');
const {student} = require('../models/student');
const {HttpCodes,CustomErrors,surgeObject} = require('../response');
const jwt = require("jsonwebtoken");

async function collegeByState(req, res, next) {
  try {
    var groupByState = await college.aggregate([{
      "$group": {
        _id: "$state",
        count: {
          $sum: 1
        }
      }
    }])
    var count = await college.count();
    return res.status(HttpCodes.OK).send({
      'response': {
        'message': "colleges fetched",
        'result': {
          'colleges': groupByState,
          'count': count
        }
      }
    });

  } catch (ex) {
    next(ex)
  }
}

async function collegeByCourse(req, res, next) {
  try {
    var groupByState = await college.aggregate([{
      $unwind: '$courses'
    }, {
      $group: {
        _id: '$courses',
        count: {
          $sum: 1
        }
      }
    }])
    var count = 0;
    for (let i = 0; i < groupByState.length; i++) {
      count = count + groupByState[i].count
    }
    return res.status(HttpCodes.OK).send({
      'response': {
        'message': "colleges fetched",
        'result': {
          'colleges': groupByState,
          'count': count
        }
      }
    });

  } catch (ex) {
    next(ex)
  }
}

async function filterColleges(req, res, next) {
  try {
    var query = {}
    if (req.query.state) {
      query['state'] = req.query.state;
    }
    if (req.query.course) {
      query['courses'] = {
        $in: [req.query.course]
      };
    }
    var groupByState = await college
      .find(query)
      .skip(Number(req.query.limit) * ((req.query.page) - 1))
      .limit(Number(req.query.limit))
    var count = await college.count(query);
    return res.status(HttpCodes.OK).send({
      'response': {
        'message': "colleges fetched",
        'result': {
          'colleges': groupByState,
          'count': count
        }
      }
    });

  } catch (ex) {
    next(ex)
  }
}

async function getCollege(req, res, next) {
  try {
    var query = {}
    if (req.query.name) {
      query['name'] = req.query.name;
    } else if (req.query.id) {
      query['_id'] = req.query.id
    }
    var collegeObject = await college.findOne(query);
    return res.status(HttpCodes.OK).send({
      'response': {
        'message': "college fetched",
        'result': {
          'college': collegeObject
        }
      }
    });

  } catch (ex) {
    next(ex)
  }
}

async function getStudentList(req, res, next) {
  try {
    var query = {
      "college": req.params.college
    };
    var studentList = await student.find(query)
      .skip(Number(req.query.limit) * ((req.query.page) - 1))
      .limit(Number(req.query.limit))
    var count = await student.count(query);
    return res.status(HttpCodes.OK).send({
      'response': {
        'message': "student fetched",
        'result': {
          'student': studentList,
          "count": count
        }
      }
    });

  } catch (ex) {
    next(ex)
  }
}

async function getStudent(req, res, next) {
  try {
    var query = {
      _id: req.params.id
    }
    var studentObject = await student.findOne(query);
    return res.status(HttpCodes.OK).send({
      'response': {
        'message': "student fetched",
        'result': {
          'student': studentObject
        }
      }
    });

  } catch (ex) {
    next(ex)
  }
}

async function getSimilarColleges(req, res, next) {
  try {
    var collegeObject = await college.findOne({
      "_id": req.params.college
    });
    if (collegeObject) {
      var query = {
        _id: {
          $ne: req.params.college
        },
        state: collegeObject.state,
        courses: {
          $in: collegeObject.courses
        },
        number_of_students: {
          $gte: collegeObject.number_of_students - 100,
          $lte: collegeObject.number_of_students + 100
        }
      };
      var similarColleges = await college.find(query)
        .skip(Number(req.query.limit) * ((req.query.page) - 1))
        .limit(Number(req.query.limit))
      var count = await college.count(query);
      return res.status(HttpCodes.OK).send({
        'response': {
          'message': "colleges fetched",
          'result': {
            'colleges': similarColleges,
            "count": count
          }
        }
      });
    } else {
      return res.status(HttpCodes.NOT_FOUND).send({
        'response': {
          'message': "no college find with given Id",
          'result': {
            'colleges': null
          }
        }
      });
    }
  } catch (ex) {
    next(ex)
  }
}
module.exports = {
  collegeByState,
  collegeByCourse,
  filterColleges,
  getCollege,
  getStudentList,
  getStudent,
  getSimilarColleges
};