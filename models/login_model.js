const db = require('./connection_db');

module.exports = function memberLogin(memberData) {
    let result = {};
    return new Promise((resolve, reject) => {
        // 找尋
        db.query(
            'SELECT * FROM users WHERE account = ? AND password = ?',
            [memberData.account, memberData.password],
            function (err, rows) {
                if (err) {
                    result.status = '登入失敗。';
                    result.err = '伺服器錯誤，請稍後在試！';
                    reject(result);
                    return;
                }else{
                    console.log(rows[0].role_id);
                    if(rows[0].role_id == 1){
                        db.query(
                            'SELECT role_id,account,user_id,name,department FROM users join students on users.id = students.user_id WHERE account = ? ',
                            memberData.account,
                            function(err,rows){
                                console.log(rows);
                                if (err) {
                                    result.status = '登入失敗。';
                                    result.err = '伺服器錯誤，請稍後在試！';
                                    reject(result);
                                    return;
                                }else{
                                    resolve(rows);
                                }
                            })
                    }else if(rows[0].role_id == 2){
                        db.query(
                            'SELECT role_id,account,user_id,name FROM users join teachers on users.id = teachers.user_id WHERE account = ? ',
                            memberData.account,
                            function(err,rows){
                                console.log(rows);
                                if (err) {
                                    result.status = '登入失敗。';
                                    result.err = '伺服器錯誤，請稍後在試！';
                                    reject(result);
                                    return;
                                }else{
                                    resolve(rows);
                                }
                            })
                    }
                }
            }
        );
    });
};
