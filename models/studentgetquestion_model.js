const db = require('./connection_db');

module.exports = function studentGetQuestion(uid,sid) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT answer FROM answer_statuses WHERE answer_statuses.user_id = ?',
            sid,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    result.status = '題目載入失敗';
                    result.err = '伺服器錯誤，請稍後在試！';
                    reject(result);
                    return;
                }
                else if (rows.length === 0){
                    db.query(
                        'SELECT qs.id,qs.unit_id,qs.question,qs.option_a,qs.option_b,qs.option_c,qs.option_d,qs.answer as q_answer,us.name FROM questions as qs JOIN units as us on qs.unit_id = us.id WHERE unit_id = ?',
                        uid,
                        function (err, rows) {
                            if (err) {
                                console.log(err);
                                result.status = '題目載入失敗';
                                result.err = '伺服器錯誤，請稍後在試！';
                                reject(result);
                                return;
                            }
                            resolve(rows);
                    })
                }else if(rows.length >= 1){
                    db.query(
                        'select question_id as id ,answer_statuses.answer as s_answer,question,option_a,option_b,option_c,option_d,questions.answer as q_answer,q_analyze,name FROM answer_statuses join questions on answer_statuses.question_id =  questions.id JOIN units as us on questions.unit_id = us.id WHERE user_id = ? and unit_id = ?',
                        [sid,uid],
                        function (err, rows) {
                            if (err) {
                                console.log(err);
                                result.status = '題目載入失敗';
                                result.err = '伺服器錯誤，請稍後在試！';
                                reject(result);
                                return;
                            }
                            resolve(rows);
                            }
                        )
                }
            }

        );


        

    });
};
