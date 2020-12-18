const db = require('./connection_db');

module.exports = function studentGetQuestion(uid,sid) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT answer_statuses.answer FROM answer_statuses join questions on answer_statuses.question_id = questions.id  WHERE answer_statuses.user_id = ? and unit_id =?',
            [sid,uid],
            function (err, rows) {
                if (err) {
                    console.log(`err 1 :${err}`);
                    result.status = 'fail';
                    result.err = '伺服器錯誤';
                    reject(result);
                    return;
                }
                else if (rows.length === 0){
                    db.query(
                        'SELECT qs.id,qs.unit_id,qs.question,qs.option_a,qs.option_b,qs.option_c,qs.option_d,qs.answer as q_answer,us.name,q_analyze FROM questions as qs JOIN units as us on qs.unit_id = us.id WHERE unit_id = ?',
                        uid,
                        function (err, rows) {
                            if (err) {
                                console.log(err);
                                result.status = 'fail';
                                result.err = '伺服器錯誤';
                                reject(result);
                                return;
                            }else if(rows.length === 0){
                                result.status = 'fail';
                                result.err = '0題目為空';
                                reject(result);
                                return;
                            }
                            rows[0].status = 'success';
                            resolve(rows);
                    })
                }else if(rows.length >= 1){
                    console.log(rows.length);
                    console.log(rows);
                    db.query(
                        'select question_id as id ,answer_statuses.answer as s_answer,question,option_a,option_b,option_c,option_d,questions.answer as q_answer,q_analyze,name FROM answer_statuses join questions on answer_statuses.question_id =  questions.id JOIN units as us on questions.unit_id = us.id WHERE user_id = ? and unit_id = ?',
                        [sid,uid],
                        function (err, rows) {
                            if (err) {
                                console.log(err);
                                result.status = 'fail';
                                result.err = '伺服器錯誤';
                                reject(result);
                                return;
                            }else if(rows.length === 0){
                                result.status = 'fail';
                                result.err = '1題目為空';
                                reject(result);
                                return;
                            }
                            rows[0].status = 'success';
                            resolve(rows);
                            }
                        )
                }
            }

        );


        

    });
};
