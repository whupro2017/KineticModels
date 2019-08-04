const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
// const bodyParse = require('body-parser');
// const jwt = require('jsonwebtoken');
// const secretkey = 'ddlove';
const app = express();
const path = require('path');

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,token');
    res.header('X-Powered-By', '3.2.1');
    next();
});

app.set('view engine', 'ejs');
// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// 处理post请求
// app.use(bodyParse.json());
// app.use(bodyParse.urlencoded({extended: true}));

app.use('/docs', express.static('docs'));
app.use('/public', express.static('public'));

// api
// const api_index = require('./routes/api/index');
const api_hand = require('./routes/api/hand');
const api_bio = require('./routes/api/bio');
const api_elec = require('./routes/api/elec');
const api_file = require('./routes/api/file');
const api_foot = require('./routes/api/foot');
const api_tool = require('./routes/api/tool');
//字典api接口
const api_dict = require('./routes/api/dictionary');

// app.use('/api/index', api_index);

// 模块列表
app.use('/api/bio', api_bio);
app.use('/api/elec', api_elec);
app.use('/api/file', api_file);
app.use('/api/foot', api_foot);
app.use('/api/hand', api_hand);
app.use('/api/tool', api_tool);
app.use('/api/dictionary', api_dict);

// web
const web_index = require('./routes/web/index');
// Bio 模块
const bio_list = require('./routes/web/bio/list');
const bio_detail = require('./routes/web/bio/detail');
// elec 模块
const elec_list = require('./routes/web/elec/list');
const elec_detail = require('./routes/web/elec/detail');
// file 模块
const file_list = require('./routes/web/file/list');
const file_detail = require('./routes/web/file/detail');
// foot 模块
const foot_list = require('./routes/web/foot/list');
const foot_detail = require('./routes/web/foot/detail');
// hand 模块
const hand_list = require('./routes/web/hand/list');
const hand_detail = require('./routes/web/hand/detail');
// tool 模块
const tool_list = require('./routes/web/tool/list');
const tool_detail = require('./routes/web/tool/detail');


app.use('/web/index', web_index);
// bio
app.use('/web/bio/list', bio_list);
app.use('/web/bio/detail', bio_detail);
// elec
app.use('/web/elec/list', elec_list);
app.use('/web/elec/detail', elec_detail);
// file
app.use('/web/file/list', file_list);
app.use('/web/file/detail', file_detail);
// foot
app.use('/web/foot/list', foot_list);
app.use('/web/foot/detail', foot_detail);
// handprint
app.use('/web/hand/list', hand_list);
app.use('/web/hand/detail', hand_detail);
// tool
app.use('/web/tool/list', tool_list);
app.use('/web/tool/detail', tool_detail);

// index
app.use('/', function (req, res) {
    res.redirect("/web/index");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
