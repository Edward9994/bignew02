//连接数据库
const con = require('./util/sql');
// 服务器创建
const express = require('express');
const app = express()
app.listen(8080, () => {
    console.log('端口8080，服务器正在运行');
})