const express = require('express')
const conn = require('../util/sql')
const jwt = require("jsonwebtoken")
const router = express.Router()
router.use(express.urlencoded())
// 根据id获取文章分类列表
router.get('/getCatesById', (req, res) => {
    const { id } = req.query;
    const sqlStr = `select * from categories where id=${id}`
    conn.query(sqlStr, (err, results) => {
        if (err) return res.status(500).json({ code: 500, msg: '服务器错误' });
        if (results.length === 1) {
            res.json({
                "status": 0,
                "message": "获取文章分类列表成功！",
                "data": [
                    {
                        "Id": `${id}`,
                        "name": `${results[0].name}`,
                        "slug": `${results[0].slug}`
                    }
                ]
            })
        }
    })
})
//新增文章分类
router.post('/addcates', (req, res) => {
    const { name, slug } = req.body;
    let sqlStr = `select * from categories where name='${name}' or  slug='${slug}'`
    conn.query(sqlStr, (err, results) => {
        if (err) return res.status(500).json({ code: 500, msg: '服务器错误' });
        if (results.length === 1) return res.json({ code: 1, mgs: '类别或别称已存在' });
        sqlStr = `insert into categories (name,slug) values("${name}","${slug}")`
        conn.query(sqlStr, (err, results) => {
            if (err) return res.status(500).json({ code: 500, msg: '服务器错误' });
            if (results.affectedRows === 1) return res.json({
                status: 0,
                msg: "新增文章分类成功！"
            });

        })
    })

})
// /删除文章类别
router.get('/deletecate', (req, res) => {
    const { id } = req.query;
    // console.log(id);
    const sqlStr = `delete from categories where id=${id}`;
    conn.query(sqlStr, (err, results) => {
        if (err) return res.status(500).json({ code: 500, msg: '服务器错误' });
        if (results.affectedRows === 1) return res.json({
            "status": 0,
            "message": "删除文章分类成功！"
        })
    })
})

// 获取全部文章分类数据
router.get('/cates', (req, res) => {
    const sqlStr = 'select * from categories';
    conn.query(sqlStr, (err, results) => {
        if (err) return res.status(500).json({ code: 500, msg: '服务器错误' });
        if (results.length >= 1) return res.json(
            {
                "status": 0,
                "message": "获取文章分类列表成功！",
                "data": results
            }
        )
    })
})
// 更新
router.post('/updatecate', (req, res) => {
    const { name, slug, id } = req.body;
    let sqlStr = `update categories set name='${name}',slug='${slug}'  where id=${id}`
    conn.query(sqlStr, (err, results) => {
        if (err) return res.status(500).json({ code: 500, msg: '服务器错误' });
        if (results.affectedRows === 1) return res.json({
            "status": 0,
            "message": "更新分类信息成功！"
        })
    })
})
module.exports = router