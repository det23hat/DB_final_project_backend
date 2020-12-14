const studentGetUnit = require('../models/studentgetunit_model');
const GetQuestion = require('../models/teachergetquestion_model');
const StudentList = require('../models/studentlist_model');
const teacherGetUnit = require('../models/teachergetunit_model');
const verify = require('../models/verification.js');

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
                    GetQuestion(question_unit_id).then(
                        (results) => {
                            let object ={};
                            let q_object_array = [];
                            for(let index = 0; index < results.length; index++){
                                let q_object ={};
                                q_object.id = results[index].id;
                                q_object.question = results[index].question;
                                q_object.unit_id = results[index].unit_id;
                                q_object.option_a = results[index].option_a;
                                q_object.option_b = results[index].option_b;
                                q_object.option_c = results[index].option_c;
                                q_object.option_d = results[index].option_d;
                                q_object.answer = results[index].answer;

                                q_object_array[index] = q_object;
                            }
                            for (let index = 0; index < q_object_array.length; index++) {
                                console.log(q_object_array[index]);
                            }
                            object.name = results[0].name;
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
};
