const updateUnitState = require('../models/modifyunitstate_model');
const updateStudentAnswer = require('../models/updateanswerstate_model');
const updateStudentScore = require('../models/updatescore_model');
const verify = require('../models/verification.js');

module.exports = class Status {
    postUnitState(req, res) {
        let unit_id = req.body.uid;
        updateUnitState(unit_id).then(
            (result) => {
                res.json({
                    status: 'success',
                    result: result,
                });
            },
            (err) => {
                // 若寫入失敗則回傳
                res.json({
                    status: 'fail',
                    result: err,
                });
            }
        );
    }
    postStudentAnswerState(req,res){
        const uid = req.body.uid;
        const qid = req.body.qid;
        const ans = req.body.ans;
        const score = req.body.score;
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
                err: '請輸入token',
            });
        } else if (judgeObj(token) === false) {
            verify(token).then((tokenResult) => {
                if (tokenResult === false) {
                    res.json({
                        result: {
                            status: 'fail',
                            err: '請重新登入',
                        },
                    });
                } else {
                    let payload = tokenResult;
                    const sid = payload.user_id;
                    updateStudentScore(sid,uid,score).then(
                        (result)=>{
                            console.log(`result:${result.status}`);
                            updateStudentAnswer(sid,qid,ans).then(
                                (result) => {
                                    res.json({
                                        result:{
                                            status:'success',
                                            token:token
                                        }
                                    })
                                },
                                (err)=>{
                                    res.json({
                                        result: err,
                                    });
                                }
                            )
                        },
                        (err) =>{
                            res.json({
                                result: err,
                            });
                        }
                    )

                }
            })
        }
        
        
    }
};
