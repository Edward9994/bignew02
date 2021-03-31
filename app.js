const con = require('./util/sql');
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('express-jwt')
const userRouter = require('./router/user.js')
const accountRouter = require('./router/account.js')
const cateRouter = require('./router/cate.js')

//静态托管
app.use('/uploads', express.static('uploads'))

//跨域
app.use(cors());


//路由中间件
// 注册登录
app.use('/api', accountRouter)
// 个人中心
app.use('/my', userRouter)
// 文章分类
app.use('/my/article', cateRouter)

//token生成与认证
// app.use(jwt({
//     secret: 'gz61', // 生成token时的 钥匙，必须统一
//     algorithms: ['HS256'] // 必填，加密算法，无需了解
// }).unless({
//     path: ['/api/login', '/api/register', /^\/uploads\/.*/] // 除了这两个接口，其他都需要认证
// }));




// 6.0 错误处理中间件用来检查token合法性
// app.use((err, req, res, next) => {
//     // console.log('有错误', err)
//     if (err.name === 'UnauthorizedError') {
//         // res.status(401).send('invalid token...');
//         res.status(401).send({ code: 1, message: '身份认证失败！' });
//     }
// })

app.listen(8080, () => {
    console.log('端口8080，服务器正在运行');
})