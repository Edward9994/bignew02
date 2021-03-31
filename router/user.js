const express = require('express')
const conn = require('../util/sql')
const router = express.Router()
const jwt = require('jsonwebtoken')
const multer = require('multer')
const uploads = multer({ dest: 'uploads' })
router.use(express.urlencoded())
// 获取用户基本信息
router.get('/userinfo', (req, res) => {
    const sqlStr = `select * from users where username='${req.query.username}'`;
    conn.query(sqlStr, (err, results) => {
        if (err) return res.status(500).json({ code: 500, msg: '服务器错误' });
        res.json({
            "status": 0,
            "message": "获取用户基本信息成功！",
            "data": {
                "id": `${results[0].id}`,
                "username": `${results[0].username}`,
                "nickname": `${results[0].nickname}`,
                "email": `${results[0].email}`,
                "user_pic": `${results[0].userPic}`
            }
        })
    })
})
// 更新用户基本信息
router.post('/userinfo', (req, res) => {
    const { id, email, userPic, username } = req.body;
    let arr = [];
    if (username) arr.push(`username="${username}"`);
    if (email) arr.push(`email="${email}"`);
    if (userPic) arr.push(`userPic="${userPic}"`);
    arr = arr.join()
    const sqlStr = `update users set ${arr} where id=${id}`
    conn.query(sqlStr, (err, results) => {
        if (err) return res.status(500).json({ code: 500, msg: '服务器错误' });
        if (results.affectedRows === 1) return res.json({
            "status": 0,
            "message": "修改用户信息成功！"
        })
    })
})
//上传用户头像
router.post('/uploadPic', uploads.single('file_data'), (req, res) => {
    res.json({
        "status": 0,
        "msg": `http://127.0.0.1:8080/uploads/${req.file.filename}`
    })
})
//重置密码
router.post('/updatepwd', (req, res) => {
    const { oldPwd, newPwd, id } = req.body;
    let sqlStr = `select * from users where password="${oldPwd}" and id=${id}`;
    conn.query(sqlStr, (err, results) => {
        if (err) return res.status(500).json({ code: 500, msg: '服务器错误' });
        //原密码正确
        if (results.length === 1) {
            sqlStr = `update users set password='${newPwd}' where id=${id}`;
            conn.query(sqlStr, (err, results) => {
                if (err) return res.status(500).json({ code: 500, msg: '服务器错误' });
                if (results.affectedRows === 1) return res.json({
                    "status": 0,
                    "msg": "更新密码成功！"
                })
            })
        } else {
            res.json({ code: 1, msg: '原密码错误' })
        }

    })
})
module.exports = router;