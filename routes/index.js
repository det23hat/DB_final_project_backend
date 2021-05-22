var express = require('express');
var router = express.Router();

const StudentModifyMethod = require('../controllers/modify_controller');
const GetDataMethod = require('../controllers/getdata_controller');
const UpdateStateMethod = require('../controllers/updatestate_controller');

let studentModifyMethod = new StudentModifyMethod();
let getDataMethod = new GetDataMethod();
let updateStateMethod = new UpdateStateMethod();


/* GET home page. 
router.get('/', function (req, res, next) {
    //console.log(req.body.test);
    res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {
    console.log(req.body.test);
});
*/

router.post('/api/register', studentModifyMethod.postRegister);

router.post('/api/login', studentModifyMethod.postLogin);

//老師送題目
router.post('/api/send-questions', updateStateMethod.postUnitState);

//學生或老師取得題目
router.get('/api/questions/:id', getDataMethod.getQuestion);

//學生或老師取得題目
router.get('/api/units', getDataMethod.getUnit);

//學生分數跟答題狀況
router.post('/api/answer', updateStateMethod.postStudentAnswerState);

//傳uid
router.get('/api/student-list', getDataMethod.getStudentList);

router.get('/api/student/detail/:uid',getDataMethod.getStudentDetail);

router.get('/api/question-overview',getDataMethod.getQuestionOverview);

//傳uid
router.get('/api/question-result/:id',getDataMethod.getQuestionResult);

router.get('/api/all-students-scores/:unitId',getDataMethod.getAllStudentScores);

//router.get('/students',)

//router.get('/student/unit', getDataMethod.getUnit);

//router.get('/student/unit/question', getDataMethod.getQuestion);

module.exports = router;
