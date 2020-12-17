const db = require('./connection_db');

module.exports = function completeUnit() {
    let result = {};
    return new Promise((resolve, reject) => {
        let completeUnit = [];
        
        let uid = 1;
            console.log("in 2");
        db.query('select count(id) as totalStudent from students').then(totalStudent =>{
            console.log(`totalStudent : ${totalStudent[0].totalStudent}`);
            if (err) {
                console.log(err);
                result.status = 'fail';
                result.err = '伺服器錯誤，請稍後在試！';
                reject(result);
                return;
            }
            let i = 0;
            while(uid <= 3){
            db.query('select count(user_id) as totalScoreNum from scores where unit_id',uid).then(rows =>{
                    if(rows[0].totalScoreNum > 0 && (rows[0].totalScoreNum == totalStudent[0].totalStudent)){
                        completeUnit[i]=uid;
                        i++;
                    }
                    uid++;
                })
            }
        })



    }
}