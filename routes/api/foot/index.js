const express = require('express');
const app = express();
const db = require('../../../db/db'); //引入db
const {foot} = require('../../../db/sqls');

const {RspMsg, ResCode} = require('../../../utils/rspMsg');

const getinfo = (req, res) => {
    const item_id = req.query.id;
    const arr = [item_id];
    db.query(foot.queryById, arr, function (err, rows) {
        if (err) {
            RspMsg(res, {
                data: '失败',
                msg: 'error',
                code: ResCode.errorcode,
            });
        }
        if (rows) {
            RspMsg(res, {
                data: rows,
                code: ResCode.succode,
            });
        }
    });
};

const add = (req, res) => {
    const v1 = req.body
    const arr = [
        v1.ID, v1.ID,'e10adc3949ba59abbe56e057f20f883e', "5001", v1.DESCRIPTION, v1.LEFT_POSITION, v1.COLLECTION_MODE, v1.COLLECTED_BY_NAME,v1.COLLECTED_DATE, '1','B'];
    db.query(foot.insert, arr, function (err, rows) {
        if (err) {
            RspMsg(res, {
                data: '失败',
                msg: 'error',
                code: ResCode.errorcode,
            });
        }
        const bs64 = new Buffer(rows[0].CONTENT).toString('base64');
        rows[0].CONTENT = bs64;
        if (rows) {
            RspMsg(res, {
                data: rows,
                code: ResCode.succode,
            });
        }
    });
};

const update = (req, res) => {
    const v1 = req.body;
    const arr = [
        v1.PRINT_TYPE,v1.PRINT_CODE,v1.LEFT_POSITION,
        v1.COLLECTION_MODE,v1.COLLECTED_BY_NAME,v1.COLLECTED_DATE,
        v1.UTILIZATION, v1.CRIMINAL_FLAG ,v1.ID
    ];
    db.query(foot.updateInfo, arr, (err, rows) => {
        if (rows && rows.changedRows === 0) {
            RspMsg(res,{
                data: '暂无数据更新',
                code: ResCode.succode
            });
        } else if (rows && rows.changedRows > 0) {
            RspMsg(res,{
                data: '更新成功',
                code: ResCode.succode
            });
        }
    });
};

// 根据id获取信息
app.get('/getinfo', function (req, res) {
    getinfo(req, res);
});
// 添加 测试用
app.post('/add', function (req, res) {
    add(req, res);
});
// 修改
app.post('/update', function (req, res) {
    update(req, res);
});

app.get('/', function (req, res) {
    getinfo(req, res);
});
module.exports = app;