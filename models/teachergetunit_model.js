const db = require('./connection_db');

module.exports = function teacherGetUnit() {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM unit_list', function (err, rows) {
            if (err) {
                console.log(err);
                result.status = '單元載入失敗';
                result.err = '伺服器錯誤，請稍後在試！';
                reject(result);
                return;
            }
            resolve(rows);
        });
    });
};
