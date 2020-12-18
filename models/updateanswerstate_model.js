const db = require('./connection_db');

module.exports = function updateAnserState(sid,qid,ans){
    let result ={};
    console.log(`sid = ${sid}`);
    
    return new Promise((resolve, reject) => {
        let data;
        for(i=0;i<ans.length;i++){
            data ={
                user_id : sid,
                question_id : parseInt(qid[i]),
                answer : ans[i]
            }
            console.log(`qid = ${data.question_id}`);
            console.log(`ans = ${data.ans}`);
            db.query('INSERT INTO answer_statuses set ?',data,function(err, rows){
                if (err) {
                    console.log(err);
                    result.status = 'fail';
                    result.err = '伺服器錯誤';
                    reject(result);
                    return;
                }else{
                    result.status = 'success';
                    resolve(result);
                }
            })
        }
        
        
    });
}