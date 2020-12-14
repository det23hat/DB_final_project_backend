const db = require('./connection_db');


module.exports = function studentList() {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT u.account as studentID ,stu.name ,stu.department , sum(s.score)/count(distinct s.unit_id) as averageScore FROM students AS stu JOIN users AS u on u.id = stu.user_id JOIN scores AS s ON s.user_id = u.id  GROUP BY stu.id',
            function (err, rows) {
                if (err) {
                    console.log(err);
                    result.status = '單元載入失敗';
                    result.err = '伺服器錯誤，請稍後在試！';
                    reject(result);
                    return;
                }
                resolve(rows);
            }
        );
    });
};
