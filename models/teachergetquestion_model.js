const db = require('./connection_db');

module.exports = function teacherGetQuestion(qid) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT question,option_a,option_b,option_c,option_d,answer,q_analyze FROM question_bank WHERE unit_id = ?',
            qid,
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
        );
    });
};
