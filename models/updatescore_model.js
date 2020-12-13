const db = require('./connection_db');

module.exports = function updateAnserState(student_id,uid,score){
    let result ={};
    let data = {
        student_id:student_id,
        unit_id:uid,
        score:score
    }
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO scores set ？',data,function(err, rows){
            if (err) {
                console.log(err);
                result.status = 'fail';
                result.err = '伺服器錯誤，請稍後在試！';
                reject(result);
                return;
            }else{
                result.registerMember = memberData;
                resolve(result);
            }
        });
    });
}