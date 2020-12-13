var express = require('express');
var router = express.Router();

const StudentModifyMethod = require('../controllers/modify_controller');
const GetDataMethod = require('../controllers/getdata_controller');
const UpdateUnitStateMethod = require('../controllers/updatestate_controller');

let studentModifyMethod = new StudentModifyMethod();
let getDataMethod = new GetDataMethod();
let updateUnitStateMethod = new UpdateUnitStateMethod();

/* GET home page. 
router.get('/', function (req, res, next) {
    //console.log(req.body.test);
    res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {
    console.log(req.body.test);
});
*/

router.post('/register', studentModifyMethod.postRegister);

router.post('/login', studentModifyMethod.postLogin);

//老師送題目
router.post('/send-questions', updateUnitStateMethod.postUnitState);

//學生或老師取得題目
router.get('/questions/:id', getDataMethod.getQuestion);

//學生或老師取得題目
router.get('/units', getDataMethod.getUnit);

//學生分數跟答題狀況
router.post('/answer/unit/:uid/student/:sid',);

//router.get('/students',)

//router.get('/student/unit', getDataMethod.getUnit);

//router.get('/student/unit/question', getDataMethod.getQuestion);

module.exports = router;
