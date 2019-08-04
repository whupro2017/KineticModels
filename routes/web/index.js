'use strict';
const express = require('express');
const app = express();

app.set('views engine', 'ejs'); // 设置模板扩展名后缀自动添加
app.set('views', './views/web'); // 设置模板路径

const obj = {
    bio: 'bio/detail',
    elec: 'elec/detail',
    file: 'file/detail',
    foot: 'foot/detail',
    hand: 'hand/detail',
    tool: 'tool/detail'
};
app.get('/', (req, res) => {
    const type = req.query.type;
    if(!Object.keys(obj).includes(type)){
        res.send({
            msg:"请输入正确的type:bio,elec,file,foot,hand,tool"
        });
        return
    }
    res.render(obj[type], {
        title: 'success index',
        data: 'v1.data'
    });
});
// app.get('/', (req, res) => {
//     res.render('index', {
//         title: 'success index',
//         data: 'v1.data'
//     });
// });
module.exports = app;