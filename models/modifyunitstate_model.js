const db = require('./connection_db');

module.exports = function modifyUnitState(uid) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query('UPDATE units SET isSend = true WHERE id = ?',
        uid,
        function (err, rows) {
                if (err) {
                    console.log(err);
                    result.status = 'fail';
                    result.err = '伺服器錯誤';
                    reject(result);
                    return;
                }
                result.status = 'success';
                resolve(result);
            }
        );
    });
};
