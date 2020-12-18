const db = require('./connection_db');


module.exports = function allStudentScores(uid) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query(
            'select s.name,sc.score from students AS s JOIN scores as sc ON sc.user_id = s.user_id  where sc.unit_id = ?',
            uid,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    result.status = 'fail';
                    result.err = '伺服器錯誤';
                    reject(result);
                    return;
                }
                resolve(rows);
            }
        );
    });
};
