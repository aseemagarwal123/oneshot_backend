const router = require('express').Router();
const {collegeByState,collegeByCourse,filterColleges,getCollege,getStudentList,getStudent,getSimilarColleges} = require('../controllers/collegeController');
router.get('/collegebystate', collegeByState);
router.get('/collegebycourse', collegeByCourse);
router.get('/filtercollege', filterColleges);
router.get('/getcollege', getCollege);
router.get('/getstudentlist/:college', getStudentList);
router.get('/getstudent/:id', getStudent);
router.get('/getsimilarcolleges/:college', getSimilarColleges);

module.exports = router;
