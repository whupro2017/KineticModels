
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123',
    database : 'pointcloud'
});

connection.connect();
var sss="xx";

connection.query('SELECT case_id from case_t', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[2]);
});
