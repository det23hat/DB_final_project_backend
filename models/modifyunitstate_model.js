const db = require('./connection_db');

module.exports = function modifyUnitState(uid) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE unit_list SET isSend = true WHERE id = ?',
            uid,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    result.status = '題目發送失敗';
                    result.err = '伺服器錯誤，請稍後在試！';
                    reject(result);
                    return;
                }
                result.status = 'TRUE';
                resolve(result);
            }
        );
    });
};
