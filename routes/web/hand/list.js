'use strict';
const express = require('express');
const app = express();
const ejs = require('ejs');
const {hand} = require('../../../db/sqls');
const db = require('../../../db/db.js');

app.engine('ejs', ejs.__express); // 配置识别ejs模板

app.set('views engine', 'ejs'); // 设置模板扩展名后缀自动添加
app.set('views', './views/web'); // 设置模板路径

app.get('/', (req, res) => {
    db.query(hand.query, [], (err, rows) => {
        res.render('hand/list', {
            title: 'hand/list',
            data: rows
        });
    });
});
module.exports = app;