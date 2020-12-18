const db = require('./connection_db');


module.exports = function studentGetUnit() {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT id,name FROM  units WHERE isSend = 1',
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
