const db = require('./connection_db');


module.exports = function questionResult(uid) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query(
            'select s.name , anst.answer as studentOption ,q.id,u.name as unitTitle, q.question , q.option_a , q.option_b , q.option_c ,  q.option_d , q.answer from students AS s JOIN answer_statuses AS anst ON anst.user_id = s.user_id join questions as q on q.id = question_id join units as u on u.id = q.unit_id where u.id =? order by s.user_id',
            uid,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    result.status = 'fail';
                    result.err = '伺服器錯誤';
                    reject(result);
                    return;
                }
                db.query('select id as qid,question,option_a , option_b , option_c ,  option_d , answer from questions where unit_id = ?',
                uid,
                function(err,totals){
                    if (err) {
                        console.log(err);
                        result.status = 'fail';
                        result.err = '伺服器錯誤';
                        reject(result);
                        return;
                    }
                    let totalQ =[];
                    let questionObject;
                    for(let i = 0 ; i< totals.length ;i++){
                        console.log(totals[i].qid);
                        totalQ[i] = totals[i].qid;
                    }
                    
                    result.rows = rows;
                    result.total = totalQ;
                    result.questions = totals;
                    resolve(result);
                })
                
            }
        );
    });
};