const toRegister = require('../models/register_model');
const encryption = require('../models/encryption');
const loginAction = require('../models/login_model');
const config = require('../config/development_config');
const jwt = require('jsonwebtoken');

module.exports = class Member {
    postRegister(req, res) {
        // 獲取client端資料
        const password = encryption(req.body.password);

        const memberData = {
            department: req.body.department,
            name: req.body.name,
            account: req.body.account,
            password: password,
            role: 'student'
        };
        // 將資料寫入資料庫
        toRegister(memberData).then(
            (result) => {
                // 若寫入成功則回傳
                res.json({
                    status: '註冊成功。',
                    result: result,
                });
            },
            (err) => {
                // 若寫入失敗則回傳
                res.json({
                    result: err,
                });
            }
        );
    }
    postLogin(req, res) {
        const password = encryption(req.body.password);
        const memberData = {
            account: req.body.account,
            password: password
        };
        loginAction(memberData).then((rows) => {
            let judgeObj = function (obj) {
                if (Object.keys(obj).length == 0) {
                    return true;
                } else {
                    return false;
                }
            };
            if (judgeObj(rows) === true) {
                res.json({
                    result: {
                        status: '登入失敗。',
                        err: '請輸入正確的帳號或密碼。',
                    },
                });
            } else if (judgeObj(rows) === false) {
                let identity;
                if(rows[0].role === 1){
                    identity = 'student';
                }else if(rows[0].role === 2){
                    identity = 'teacher';
                }
                const payload = {
                    user_account: rows[0].account,
                    user_identity: identity,
                };
                const token = jwt.sign(
                    {
                        algorithm: 'HS256',
                        exp: Math.floor(Date.now() / 1000) + 60 * 60, // token半小時後過期。
                        payload,
                    },
                    config.secret
                );
                //res.setHeader('token', token);
                res.json({
                    result: {
                        status: '登入成功。',
                        loginMember: '歡迎 ' + rows[0].name + ' 的登入！',
                        identity: identity,
                        token: token,
                    },
                });
            }
        });
    }
};
