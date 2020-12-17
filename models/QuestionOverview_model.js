const db = require('./connection_db');


module.exports = function questionOverview() {
    let result = {};
    return new Promise((resolve, reject) => {
        let completeUnit = [];
        let studentsNum;
        let uid = 1;
            
        db.query('select count(id) as totalStudent from students',function(err,rows){
            
            if (err) {
                console.log(err);
                result.status = 'fail';
                result.err = '伺服器錯誤，請稍後在試！';
                reject(result);
                return;
            }else{
                console.log(`totalStudent : ${rows[0].totalStudent}`);
                studentsNum = rows[0].totalStudent;
                let i = 0;
                console.log(`uid  = ${uid}`);
                
                db.query('select count(user_id) as totalScoreNum from scores where unit_id = ?',uid,function(err,rows){
                    if (err) {
                        console.log(err);
                        result.status = 'fail';
                        result.err = '伺服器錯誤，請稍後在試！';
                        reject(result);
                        return;
                    }
                    console.log(`uid 1 = ${uid}`);
                    console.log(rows[0].totalScoreNum); 
                    if(rows[0].totalScoreNum > 0 && (rows[0].totalScoreNum == studentsNum)){
                        completeUnit[i]=uid;
                        i++;
                    }
                    uid++;
                    db.query('select count(user_id) as totalScoreNum from scores where unit_id = ?',uid,function(err,rows){
                        console.log(`uid 2 = ${uid}`);
                        console.log(rows[0].totalScoreNum); 
                        if(rows[0].totalScoreNum > 0 && (rows[0].totalScoreNum == studentsNum)){
                            completeUnit[i]=uid;
                            i++;
                        }
                        uid++;
                        db.query('select count(user_id) as totalScoreNum from scores where unit_id = ?',uid,function(err,rows){
                            console.log(`uid 3 = ${uid}`);
                            console.log(rows[0].totalScoreNum); 
                            if(rows[0].totalScoreNum > 0 && (rows[0].totalScoreNum == studentsNum)){
                                completeUnit[i]=uid;
                                i++;
                            }
                                uid++;

                                if(uid >= 3){
                                    console.log(`completeUnit : ${completeUnit}`);
                                    let easyIndex =0;
                                    let middleIndex =0;
                                    let difficultIndex =0;
                                    let easy = [];
                                    let middle = [];
                                    let difficult = [];
                                    let j;
                                    for(j =0; j < completeUnit.length ;j++){
                                        console.log("in 3");
                                        console.log(j);
                                        db.query('SELECT u.id as unitId, u.name, avg(s.score) as unitAvg FROM units AS u JOIN scores AS s ON s.unit_id = u.id GROUP BY u.id having unitAvg >80 and u.id = ?',
                                        completeUnit[j],
                                        function(err,easyUnitAvg){
                                            if (err) {
                                                console.log(err);
                                                result.status = 'fail';
                                                result.err = '伺服器錯誤，請稍後在試！';
                                                reject(result);
                                                return;
                                            }
                                            if(easyUnitAvg.length != 0){
                                                easy[easyIndex] = easyUnitAvg[0];
                                                easyIndex++;
                                            }
                                            db.query('SELECT u.id, u.name, avg(s.score) as unitAvg FROM units AS u JOIN scores AS s ON s.unit_id = u.id GROUP BY u.id having unitAvg >=60 AND unitAvg <=80 and u.id = ? ORDER BY u.id',
                                            completeUnit[j],    
                                            function(err,middleUnitAvg){
                                                    if (err) {
                                                        console.log(err);
                                                        result.status = 'fail';
                                                        result.err = '伺服器錯誤，請稍後在試！';
                                                        reject(result);
                                                        return;
                                                    }
                                                    if(middleUnitAvg.length != 0){
                                                        middle[middleIndex]= middleUnitAvg[0];  
                                                        middleIndex++; 
                                                    }
                            
                                                    db.query('SELECT u.id, u.name, avg(s.score) as unitAvg FROM units AS u JOIN scores AS s ON s.unit_id = u.id GROUP BY u.id  having unitAvg <60 ORDER BY u.id',
                                                        completeUnit[j],
                                                        function(err,difficultUnitAvg){
                                                            if (err) {
                                                                console.log(err);
                                                                result.status = 'fail';
                                                                result.err = '伺服器錯誤，請稍後在試！';
                                                                reject(result);
                                                                return;
                                                            }
                                                            if(difficultUnitAvg.length != 0){
                                                                difficult[difficultIndex] = difficultUnitAvg[0];
                                                                difficultIndex++;
                                                            }
                                                         
                                                            }
                                                        )
                                                }
                                        )
                                        })
                                        
                                    }
                                    if(j >= completeUnit.length ){
                                        result.easy = easy;
                                        result.middle = middle;
                                        result.difficult = difficult;
                                        resolve(result);
                                    }
                                }
                        })
                    })
                    
                })
                

            }
           
           

        })



    })
}

          