const db = require('./connection_db');

module.exports = function register(memberData) {
    let result = {};
    return new Promise((resolve, reject) => {
        //檢查有沒有重複帳號
        db.query(
            'SELECT account FROM users WHERE account = ?',
            memberData.account,
            function (err, rows) {
                // 將資料寫入資料庫
                if (err) {
                    console.log(err);
                    result.status = 'fail';
                    result.err = '伺服器錯誤';
                    reject(result);
                    return;
                }
                // 如果有重複的account
                if (rows.length >= 1) {
                    result.status = 'fail';
                    result.err = '已有重複的帳號';
                    reject(result);
                } else {
                    let userinfo = {
                        role_id : 1,
                        account : memberData.account,
                        password : memberData.password,
                    }
                    db.query(
                        'INSERT INTO users SET ?',
                        userinfo,
                        function (err, rows) {
                            // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                            if (err) {
                                console.log(err);
                                result.status = 'fail';
                                result.err = '伺服器錯誤';
                                reject(result);
                                return;
                            }else{
                                let user_id ;
                                db.query(
                                    'SELECT id FROM users where account = ?',
                                    memberData.account,
                                    function(err, rows){
                                        if (err) {
                                            console.log(err);
                                            result.status = 'fail';
                                            result.err = '伺服器錯誤';
                                            reject(result);
                                            return;
                                        }else{
                                            user_id = rows[0].id ;
                                            console.log(rows[0].id);
                                            let studentinfo ={
                                                user_id : user_id,
                                                name : memberData.name,
                                                department : memberData.department
                                            }
                                            db.query(
                                                'INSERT INTO students SET ?',
                                                studentinfo,
                                                function(err,rows){
                                                    if (err) {
                                                        console.log(err);
                                                        result.status = 'fail';
                                                        result.err = '伺服器錯誤';
                                                        reject(result);
                                                        return;
                                                    }else{
                                                        result.registerMember = memberData;
                                                        resolve(result);
                                                    }
                                                });
                                            }
                                            
                                        })
                                
                        
                                
                            };
                            
                        }
                    );
                }
            }
        );
    });
};
