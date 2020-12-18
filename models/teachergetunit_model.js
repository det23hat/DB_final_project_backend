const db = require('./connection_db');

module.exports = function teacherGetUnit() {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM units', function (err, rows) {
            if (err) {
                console.log(err);
                result.status = 'fail';
                result.err = '伺服器錯誤';
                reject(result);
                return;
            }
            resolve(rows);
        });
    });
};
