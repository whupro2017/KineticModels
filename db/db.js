/**
 **@desc  db.js  connect mySql
 **@params
 **@create 2019/6/5 14:36.
 **@author:ddlove
 **@email: 1334289674@qq.com
 **@return
 */
const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'pointcloud'
});

/**六张表
 * scene_bio_evidence
 * scene_bio_evidence，
 * scene_elec_evidence，
 * scene_file_evidence，
 * scene_footprint，
 * scene_handprint，
 * scene_toolmark
 * @param sql
 * @param values
 * @param callback
 */
function query (sql, values, callback) {
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        //Use the connection
        connection.query(sql, values, function (err, results, fields) {
            //每次查询都会 回调
            callback(err, results);
            // connection.release();
            if (err) throw err;
    });
        pool.releaseConnection(connection);
    });
}

module.exports = {
    query
};