const updateUnitState = require('../models/modifyunitstate_model');

module.exports = class Status {
    postUnitState(req, res) {
        const unit_id = req.body.uid;
        updateUnitState(unit_id).then(
            (result) => {
                res.json({
                    status: '發送題目成功',
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
};
