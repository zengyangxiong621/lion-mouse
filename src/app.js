require('dotenv').config();
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require("./routes"); // 引入统一的路由文件
const pool = require("./config/db");
const schedule = require('node-schedule');
const messages = require('./utils/messages');

const app = new Koa();

// 使用中间件
app.use(bodyParser());

// 定义定时任务的执行函数
const scheduledTask = async () => {
  try {
    // 请求所有的用户
    const [result] = await pool.query('SELECT * FROM users');
    // 给每个用户发送短信
    result.forEach(user => {
      console.log('user', user);
      messages.Client.main(user)
    })
    console.log('定时任务执行中...', new Date().toLocaleString());
  } catch (error) {
    console.error('定时任务执行出错：', error);
  }
};

// 设置四个定时任务
schedule.scheduleJob('0 9 * * *', scheduledTask);    // 早上 9:00
schedule.scheduleJob('30 18 * * *', scheduledTask);  // 下午 6:30
schedule.scheduleJob('30 19 * * *', scheduledTask);  // 下午 7:30
schedule.scheduleJob('0 21 * * *', scheduledTask);   // 下午 9:00

// 立即发送短信
// scheduledTask();
// 注册路由
app.use(router.routes());
app.use(router.allowedMethods());

// 错误处理
app.on("error", (err, ctx) => {
  console.error("server error", err);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
