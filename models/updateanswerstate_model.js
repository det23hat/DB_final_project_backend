const db = require('./connection_db');

module.exports = function updateAnserState(student_id,unit_id,anss){
    let result ={};
    return new Promise((resolve, reject) => {
        for(ans of anss){
            db.query()
        }
    });
}