const mysql = require('mysql')
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'bignews'
})
conn.connect(err => {
    if (err) return console.log("数据库连接失败");
    console.log('数据库连接成功');
})
// 输出接口
module.exports = conn;