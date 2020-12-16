const studentGetUnit = require('../models/studentgetunit_model');
const teacherGetQuestion = require('../models/teachergetquestion_model');
const StudentList = require('../models/studentlist_model');
const teacherGetUnit = require('../models/teachergetunit_model');
const verify = require('../models/verification.js');
const studentDetail = require('../models/studentDetail_model');
const studentGetQuestion = require('../models/studentgetquestion_model');

module.exports = class Data {
    getQuestion(req, res) {
        const question_unit_id = req.params.id;
        
        const token = req.headers['token'];
        let judgeObj = function (obj) {
            if (Object.keys(obj).length == 0) {
                return true;
            } else {
                return false;
            }
        };
        if (judgeObj(token) === true) {
            res.json({
                status: 'fail',
                err: '請輸入token！',
            });
        } else if (judgeObj(token) === false) {
            verify(token).then((tokenResult) => {
                if (tokenResult === false) {
                    res.json({
                        result: {
                            status: 'fail',
                            err: '請重新登入。',
                        },
                    });
                } else {
                    const payload = tokenResult;
                    console.log(`${payload}`);
                    console.log(`identity = ${payload.user_identity}`);
                    console.log(`id = ${payload.user_id}`);
                    if (payload.user_identity == 'teacher') {
                        teacherGetQuestion(question_unit_id).then(
                            (results) => {
                                let object ={};
                                let q_object_array = [];
                                for(let index = 0; index < results.length; index++){
                                    let q_object ={};
                                    q_object.id = results[index].id;
                                    q_object.question = results[index].question;
                                    q_object.unit_id = results[index].unit_id;
                                    q_object.optionA = results[index].option_a;
                                    q_object.optionB = results[index].option_b;
                                    q_object.optionC = results[index].option_c;
                                    q_object.optionD = results[index].option_d;
                                    q_object.questionAnswer = results[index].answer;
                                    q_object.analyze = results[index].q_analyze;

                                    q_object_array[index] = q_object;
                                }
                                for (let index = 0; index < q_object_array.length; index++) {
                                    console.log(q_object_array[index]);
                                }
                                object.name = results[0].name;
                                object.isSend = results[0].isSend;
                                object.questions = q_object_array;
                                
                                res.json({
                                    token:token,
                                    result: object,
                                });
                            },
                            (err) => {
                                // 若寫入失敗則回傳
                                res.json({
                                    result: err,
                                });
                            }
                        );
                    }else if(payload.user_identity == 'student'){
                        console.log(`unit : ${question_unit_id}`);
                        const sid = payload.user_id;
                        let object ={};
                        studentGetQuestion(question_unit_id,sid).then(
                            (results) =>{
                                if(results[0].status == 'fail'){
                                    object.status ='fail'
                                    object.err = results.err
                                }else{
                                    let q_object_array = [];
                                    for(let index = 0; index < results.length; index++){
                                        let q_object ={};
                                        q_object.id = results[index].id;
                                        q_object.question = results[index].question;
                                        //q_object.unit_id = results[index].unit_id;
                                        q_object.optionA = results[index].option_a;
                                        q_object.optionB = results[index].option_b;
                                        q_object.optionC = results[index].option_c;
                                        q_object.optionD = results[index].option_d;
                                        q_object.questionAnswer = results[index].q_answer;
                                        if(typeof(results[index].s_answer) == "undefined"){
                                            q_object.studentAnswer = "";
                                        }else{
                                            q_object.studentAnswer = results[index].s_answer;
                                        }
                                        q_object.analyze = results[index].q_analyze;
    
                                        q_object_array[index] = q_object;
                                    }
                                    for (let index = 0; index < q_object_array.length; index++) {
                                        console.log(q_object_array[index]);
                                    }
                                    object.name = results[0].name;
                                    object.questions = q_object_array;
                                }
                        
                                res.json({
                                    token:token,
                                    result: object,
                                });
                            },
                            (err) => {
                                // 若寫入失敗則回傳
                                res.json({
                                    result: err,
                                });
                            }
                        );
                    }
                    
                }
            });
        }
    }
    getUnit(req, res) {
        const token = req.headers['token'];
        console.log(`token = ${token}`);
        let judgeObj = function (obj) {
            if (Object.keys(obj).length == 0) {
                return true;
            } else {
                return false;
            }
        };
        if (judgeObj(token) === true) {
            res.json({
                status: 'fail',
                err: '請輸入token！',
            });
        } else if (judgeObj(token) === false) {
            verify(token).then((tokenResult) => {
                if (tokenResult === false) {
                    res.json({
                        result: {
                            status: 'fail',
                            err: '請重新登入。',
                        },
                    });
                } else {
                    let payload = tokenResult;
                    console.log(`${payload}`);
                    console.log(`identity = ${payload.user_identity}`);
                    console.log(`id = ${payload.user_id}`);
                    if (payload.user_identity == 'teacher') {
                        teacherGetUnit().then(
                            (result) => {
                                res.json({
                                    status:'success',
                                    token:token,
                                    result: result,
                                });
                            },
                            (err) => {
                                // 若寫入失敗則回傳
                                res.json({
                                    status:'fail',
                                    result: err,
                                });
                            }
                        );
                    } else if (payload.user_identity == 'student') {
                        studentGetUnit().then(
                            (result) => {
                                res.json({
                                    status:'success',
                                    token:token,
                                    result: result,
                                });
                            },
                            (err) => {
                                // 若寫入失敗則回傳
                                res.json({
                                    status:'fail',
                                    result: err,
                                });
                            }
                        );
                    }
                }
            });
        }
    }
    getStudentList(req, res){
        const token = req.headers['token'];
        let judgeObj = function (obj) {
            if (Object.keys(obj).length == 0) {
                return true;
            } else {
                return false;
            }
        };
        if (judgeObj(token) === true) {
            res.json({
                status: 'fail',
                err: '請輸入token！',
            });
        } else if (judgeObj(token) === false){
            verify(token).then((tokenResult) =>{
                if (tokenResult === false) {
                    res.json({
                        result: {
                            status: 'fail',
                            err: '請重新登入。',
                        },
                    });
                }else{
                    let payload = tokenResult;
                    if (payload.user_identity == 'teacher') {
                        StudentList().then(
                            (result) =>{
                                res.json({
                                    status:'success',
                                    token:token,
                                    result: result,
                                });
                            },
                            (err) =>{
                                res.json({
                                    status:'fail',
                                    result: err,
                                });
                            }
                        );
                    }else if (payload.user_identity == 'student') {
                        res.json({
                            status:'fail',
                            result: '身份是學生',
                        });
                    }
                }
            });
        }
    }
    getStudentDetail(req, res){
        const token = req.headers['token'];
        const sid = req.params.uid;
        let judgeObj = function (obj) {
            if (Object.keys(obj).length == 0) {
                return true;
            } else {
                return false;
            }
        };
        if (judgeObj(token) === true) {
            res.json({
                status: 'fail',
                err: '請輸入token！',
            });
        } else if (judgeObj(token) === false){
            verify(token).then((tokenResult) =>{
                if (tokenResult === false) {
                    res.json({
                        result: {
                            status: 'fail',
                            err: '請重新登入。',
                        },
                    });
                }else{
                    studentDetail(sid).then(
                        (result)=>{
                            res.json({
                                status:'success',
                                token:token,
                                result: result,
                            });
                        },
                        (err) =>{
                            res.json({
                                status:'fail',
                                result: err,
                            });
                        }
                    )
                }
            })
        }
    }
    getQuestionOverview(req, res){
        const token = req.headers['token'];
        let judgeObj = function (obj) {
            if (Object.keys(obj).length == 0) {
                return true;
            } else {
                return false;
            }
        };
        if (judgeObj(token) === true) {
            res.json({
                status: 'fail',
                err: '請輸入token！',
            });
        } else if (judgeObj(token) === false){
            verify(token).then((tokenResult)=>{
                if (tokenResult === false) {
                    res.json({
                        result: {
                            status: 'fail',
                            err: '請重新登入。',
                        },
                    });
                }else{
                    (sid).then(
                        (result)=>{
                            res.json({
                                status:'success',
                                token:token,
                                result: result,
                            });
                        },
                        (err) =>{
                            res.json({
                                status:'fail',
                                result: err,
                            });
                        }
                    )
                }
            })
        }
    }
};
