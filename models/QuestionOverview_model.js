const db = require('./connection_db');


module.exports = function questionOverview() {
    let result = {};
    return new Promise((resolve, reject) => {

        db.query('SELECT  u.id, u.name, avg(s.score) as unitAvg FROM units AS u JOIN scores AS s ON s.unit_id = u.id GROUP BY u.id having count(s.score)=(SELECT count(*) FROM students) AND  unitAvg >80 ORDER BY u.id',
        function(err,easyRows){
            if (err) {
                console.log(err);
                result.status = 'fail';
                result.err = '伺服器錯誤';
                reject(result);
                return;
            }
            result.easy = easyRows;
            console.log(easyRows[0]);
            db.query('SELECT  u.id, u.name, avg(s.score) as unitAvg FROM units AS u JOIN scores AS s ON s.unit_id = u.id GROUP BY u.id having count(s.score)=(SELECT count(*) FROM students) AND unitAvg >=60 AND unitAvg <=80 ORDER BY u.id',
            function(err,middleRows){
                if (err) {
                    console.log(err);
                    result.status = 'fail';
                    result.err = '伺服器錯誤';
                    reject(result);
                    return;
                }
                result.middle = middleRows;
                console.log(middleRows[0]);
                db.query('SELECT  u.id, u.name, avg(s.score) as unitAvg FROM units AS u JOIN scores AS s ON s.unit_id = u.id GROUP BY u.id having count(s.score)=(SELECT count(*) FROM students) AND unitAvg <60 ORDER BY u.id',
                function(err,difficultRows){
                    if (err) {
                        console.log(err);
                        result.status = 'fail';
                        result.err = '伺服器錯誤';
                        reject(result);
                        return;
                    }
                    result.difficult = difficultRows;
                    console.log(difficultRows[0]);
                    console.log(result.easy.length);
                    console.log(result.middle.length);
                    resolve(result);
                })
            })
        })

       
    })
}

          