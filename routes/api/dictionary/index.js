const express = require('express');
const app = express();
const db = require('../../../db/db'); //引入db
const {dictionary} = require('../../../db/sqls');

const {RspMsg, ResCode} = require('../../../utils/rspMsg');

function list (req, res) {
    const parent_key = req.query.parent_key
    if(!parent_key){
        RspMsg(res, {
            data: [],
            msg: '请填写parent_key',
            code: ResCode.succode,
        });
    }
    const arr = [parent_key];
    db.query(dictionary.queryByDict, arr, function (err, rows) {
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
}

/**
 **@desc 以下是各模块字典项使用到的parent_key 勿删
 **@params
 **@create 2019/6/19 11:13.
 **@author:ddlove
 **@email: 1334289674@qq.com
 **@return
 */
// bio
// 类型 type SWWZLBDM
// 利用情况 utilization LYQKDM

// elec
// 类型 type SB-DZWZLBDM
// 利用情况 utilization LYQKDM

// file
// 类型 type WJWZLBDM

// foot
// 类型 type ZXYLXDM
// 提取方法 method ZJTQFFDM
// 利用情况 utilization LYQKDM

// hand
// 手印类型 type SYHJLXDM
// 提取方法 method ZWTQFFDM
// 利用情况 utilization LYQKDM

// tool
// 工具种类 type GJHJZLDM
// 工具推断 infer GJTDZLDM
// 提取方法 method GJHJTQFFDM

app.get('/', function (req, res) {
    list(req, res);
});
module.exports = app;