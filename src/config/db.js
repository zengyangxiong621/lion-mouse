const mysql = require('mysql2/promise');

// 数据库连接配置
const pool = mysql.createPool({
    host: '47.119.36.161',
    user: 'root',
    password: 'aA362422@',  // 使用你设置的密码
    database: 'lion_mouse',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;

