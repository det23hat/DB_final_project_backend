const db = require('./connection_db');

module.exports = function studentDetail(sid) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query('SELECT stu.user_id, stu.name, stu.department, sum(s.score)/count(distinct s.unit_id) as average, s.unit_id,u.name, s.score FROM units AS u JOIN scores AS s on u.id=s.unit_id JOIN students AS stu ON stu.user_id = s.user_id WHERE stu.user_id = ?',
            sid,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    result.status = 'fail';
                    result.err = '伺服器錯誤，請稍後在試！';
                    reject(result);
                    return;
                }
                result.status = 'success';
                resolve(rows);
            }
        );
    });
};
