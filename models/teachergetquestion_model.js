const db = require('./connection_db');

module.exports = function teacherGetQuestion(qid) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT qs.id,qs.unit_id,qs.question,qs.option_a,qs.option_b,qs.option_c,qs.option_d,qs.answer,q_analyze,us.name FROM questions as qs JOIN units as us on qs.unit_id = us.id WHERE unit_id = ?',
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
