const db = require('./connection_db');

module.exports = function studentDetail(sid) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query('SELECT users.account as studentID, stu.name as studentName, stu.department, sum(s.score)/count(distinct s.unit_id) as average FROM units AS u JOIN scores AS s on u.id=s.unit_id JOIN students AS stu ON stu.user_id = s.user_id Join users on stu.user_id = users.id WHERE stu.user_id = ?',
            sid,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    result.status = 'fail';
                    result.err = '伺服器錯誤';
                    reject(result);
                    return;
                }
                else{
                    let studentInfo = rows;
                    console.log(studentInfo);
                    db.query('SELECT  s.unit_id as unit,u.name as title, s.score FROM units AS u JOIN scores AS s on u.id=s.unit_id JOIN students AS stu ON stu.user_id = s.user_id WHERE stu.user_id = ?',
                    sid,
                    function(err, rows){
                        if (err) {
                            console.log(err);
                            result.status = 'fail';
                            result.err = '伺服器錯誤';
                            reject(result);
                            return;
                        }
                        else{
                            console.log(rows);
                            studentInfo[0].scores = rows;
                            result.status = 'success';
                            resolve(studentInfo[0]);
                        }
                    }
                    )
                    
                }
                
            }
        );
    });
};
