const updateUnitState = require('../models/modifyunitstate_model');
const updateStudentAnswer = require('../models/updateanswerstate_model');
const updateStudentScore = require('../models/updatescore_model');

module.exports = class Status {
    postUnitState(req, res) {
        const unit_id = req.body.uid;
        updateUnitState(unit_id).then(
            (result) => {
                res.json({
                    status: '發送題目成功',
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
    postStudentAnswerState(req,res){
        const student_id = req.params.sid;
        const unit_id = req.params.uid;
        const ans = req.body.ans;
        const score = req.body.score;
        updateStudentAnswer(student_id,unit_id,ans).then(
            (result)=>{
                updateStudentScore(student_id,unit_id,score).then(
                    (result) => {
        
                    },
                    (err)=>{
        
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
};
