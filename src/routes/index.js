const Router = require('koa-router');
const userRouter = require('./user');
const pool = require('../config/db');

const router = new Router();

// 测试数据库连接的路由
router.get('/test-db', async (ctx) => {
    try {
        const [result] = await pool.query('SELECT * FROM users');
        ctx.body = {
            success: true,
            message: '数据库连接成功',
            data: result
        };
    } catch (error) {
        ctx.body = {
            success: false,
            message: '数据库连接失败',
            error: error.message
        };
    }
});

// 基础路由
router.get('/', async (ctx) => {
    ctx.body = {
        message: 'Welcome to Koa API'
    };
});

router.use(userRouter.routes());

module.exports = router;