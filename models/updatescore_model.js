const db = require('./connection_db');

module.exports = function updateAnswerState(student_id,uid,score){
    let result ={};
    let data = {
        user_id:student_id,
        unit_id:parseInt(uid),
        score:parseInt(score)
    }
    console.log(data.score);
    console.log(data.student_id);
    console.log(data.unit_id);
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO scores SET ?',data,function(err, rows){
            if (err) {
                console.log(err);
                result.status = 'fail';
                result.err = '插入分數失敗';
                reject(result);
                return;
            }else{
                result.status = 'success';
                resolve(result);
            }
        });
    });
}