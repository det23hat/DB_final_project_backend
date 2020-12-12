var express = require('express');
var router = express.Router();

const StudentModifyMethod = require('../controllers/modify_controller');
const GetDataMethod = require('../controllers/getdata_controller');
const UpdateUnitStateMethod = require('../controllers/updatestate_controller');

let studentModifyMethod = new StudentModifyMethod();
let getDataMethod = new GetDataMethod();
let updateUnitStateMethod = new UpdateUnitStateMethod();

/* GET home page. */
router.get('/', function (req, res, next) {
    //console.log(req.body.test);
    res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {
    console.log(req.body.test);
});

router.post('/register', studentModifyMethod.postRegister);

router.post('/login', studentModifyMethod.postLogin);

router.post('/send-questions', updateUnitStateMethod.postUnitState);

router.get('/questions:id', getDataMethod.getQuestion);

router.get('/units', getDataMethod.getUnit);

//router.get('/students',)

//router.get('/student/unit', getDataMethod.getUnit);

//router.get('/student/unit/question', getDataMethod.getQuestion);

module.exports = router;
