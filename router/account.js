const express = require('express')
const router = express.Router()
const conn = require('../util/sql')
const jwt = require('jsonwebtoken')
const { query } = require('../util/sql')
router.use(express.urlencoded())


//用户注册
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    //用户是否存在
    let sqlStr = `select * from users where username='${username}'`;
    conn.query(sqlStr, (err, results) => {
        if (err) return res.status(500).json({ code: 500, msg: '服务器错误' })
        if (results.length >= 1) return res.send({ "status": 1, "message": "注册失败，用户已存在！" })
        // console.log(results.length);
        //用户不存在
        sqlStr = `insert into users (username,password) values('${username}','${password}')`;
        conn.query(sqlStr, (err, results) => {
            if (err) return res.status(500).json({ code: 500, msg: '服务器错误' });
            if (results.affectedRows === 1) return res.json({ "status": 0, "message": "注册成功！" });
            return res.json({ code: 1, msg: '用户注册失败' })
        })
    })
})

// 用户登录
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    let sqlStr = `select * from users where username='${username}' and password='${password}'`;
    conn.query(sqlStr, (err, results) => {
        if (err) return res.status(500).json({ code: 500, msg: '服务器错误' });
        if (results.length === 1) {
            // 创建token
            const tokenStr = jwt.sign({ name: 'aaa' }, 'heima61', { expiresIn: 60 * 60 * 12 * 2 });
            const token = 'Bearer' + tokenStr
            return res.json({ code: 0, msg: '登录成功！', token })
        }
    })
})
module.exports = router
