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
                        (result) => {
                            res.json({
                                token:token,
                                result: result,
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
