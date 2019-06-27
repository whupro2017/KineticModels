'use strict';
const express = require('express');
const app = express();

app.set('views engine', 'ejs'); // 设置模板扩展名后缀自动添加
app.set('views', './views/web'); // 设置模板路径

app.get('/', (req, res) => {
    res.render('index', {
        title: 'success index',
        data: 'v1.data'
    });
});
module.exports = app;