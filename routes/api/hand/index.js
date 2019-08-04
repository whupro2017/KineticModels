const express = require('express');
const app = express();
const db = require('../../../db/db'); //引入db
const {hand} = require('../../../db/sqls');

const formateTime = require('../../../utils/formateTime');

const {RspMsg, ResCode} = require('../../../utils/rspMsg');

const update = (req, res) => {
    const v1 = req.body;
    //PRINT_TYPE ,PRINT_CODE ,LEFT_POSITION ,localname , CREATE_USER_ID , COLLECTION_MODE ,
    //COLLECTED_BY_NAME , COLLECTED_DATE , CRIMINAL_FLAG , UTILIZATION WHERE ID
    const _date = formateTime(v1.COLLECTED_DATE);
    const arr = [
        v1.PRINT_TYPE, v1.PRINT_CODE, v1.LEFT_POSITION, v1.localname, v1.CREATE_USER_ID, v1.COLLECTION_MODE,
        v1.COLLECTED_BY_NAME, _date, v1.CRIMINAL_FLAG, v1.UTILIZATION, v1.ID
    ];
    db.query(hand.updateInfo, arr, function (err, rows) {
        if (err) {
            RspMsg(res, {
                data: '更新失败',
                code: ResCode.errorcode,
                msg: 'error'
            });
        }
        if (rows && rows.changedRows === 0) {
            RspMsg(res, {
                data: '暂无数据更新',
                code: ResCode.succode
            });
        } else if (rows && rows.changedRows > 0) {
            RspMsg(res, {
                data: '更新成功',
                code: ResCode.succode
            });
        }
    });
};

const add = (req, res) => {
    const v1 = req.body;
    //PRINT_TYPE ,PRINT_CODE ,LEFT_POSITION ,localname , CREATE_USER_ID , COLLECTION_MODE ,
    //COLLECTED_BY_NAME , COLLECTED_DATE , CRIMINAL_FLAG , UTILIZATION WHERE ID
    const _date = formateTime(v1.COLLECTED_DATE);
    const arr = [
        v1.PRINT_TYPE, v1.PRINT_CODE, v1.LEFT_POSITION, v1.localname, v1.CREATE_USER_ID,
        v1.COLLECTION_MODE, v1.COLLECTED_BY_NAME, _date, v1.CRIMINAL_FLAG, v1.UTILIZATION,
        v1.ID,
        v1.ID
    ];
    db.query(hand.insert, arr, function (err, rows) {
        if (err) {
            RspMsg(res, {
                data: '失败',
                code: ResCode.errorcode,
                msg: 'error'
            });
        }
        if (rows && rows.changedRows === 0) {
            RspMsg(res, {
                data: '暂无数据更新',
                code: ResCode.succode,
            });
        } else if (rows && rows.changedRows > 0) {
            RspMsg(res, {
                data: '成功',
                code: ResCode.succode,
            });
        }
    });
};


const getinfo = (req, res) => {
    const item_id = req.query.id;
    const arr = [item_id];
    db.query(hand.queryById, arr, function (err, rows) {
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

// 测试用
app.post("/add", function (req, res) {
    add(req, res);
});


/**
 **@desc 更新操作
 **@params
 **@create 2019/6/13 16:15.
 **@author:ddlove
 **@email: 1334289674@qq.com
 **@return
 */
app.post("/update", function (req, res) {
    update(req, res);
});

app.get('/getinfo', function (req, res) {
    getinfo(req, res);
});

app.get('/', function (req, res) {
    getinfo(req, res);
});
module.exports = app;