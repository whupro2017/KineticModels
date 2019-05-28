var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'user1',
    password: '123456',
    database: 'pointcloud'
});

connection.connect();
var sss = "xx";

connection.query('SELECT case_id from case_t', function(error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[2]);
});