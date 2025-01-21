const Router = require("koa-router");
const DB = require("../utils/db");

const router = new Router({
  prefix: "/api/users",
});

// 获取用户列表
router.get("/", async (ctx) => {
  try {
    const users = await DB.query("SELECT * FROM users");
    ctx.body = {
      success: true,
      data: users,
    };
  } catch (error) {
    ctx.body = {
      success: false,
      message: error.message,
    };
  }
});

// 获取单个用户信息
router.get("/:id", async (ctx) => {
  try {
    const [user] = await DB.query("SELECT * FROM users WHERE id = ?", [
      ctx.params.id,
    ]);
    ctx.body = {
      success: true,
      data: user,
    };
  } catch (error) {
    ctx.body = {
      success: false,
      message: error.message,
    };
  }
});

// 创建新用户
router.post("/", async (ctx) => {
  const { name, phone, notify_feishu, notify_sms, notify_phone } =
    ctx.request.body;
  try {
    const result = await DB.query(
      "INSERT INTO users (name, phone, notify_feishu, notify_sms, notify_phone) VALUES (?, ?, ?, ?, ?)",
      [name, phone, notify_feishu, notify_sms, notify_phone]
    );
    ctx.body = {
      success: true,
      data: { id: result.insertId },
    };
  } catch (error) {
    ctx.body = {
      success: false,
      message: error.message,
    };
  }
});

// 更新用户信息
router.put("/:id", async (ctx) => {
  const { id } = ctx.params;
  const {
    name,
    phone,
    notify_feishu,
    notify_sms,
    notify_phone,
  } = ctx.request.body;

  try {
    await DB.query(
      "UPDATE users SET name = ?, phone = ?, notify_feishu = ?, notify_sms = ?, notify_phone = ? WHERE id = ?",
      [name, phone, notify_feishu, notify_sms, notify_phone, id]
    );
    ctx.body = {
      success: true,
      message: "更新成功",
    };
  } catch (error) {
    ctx.body = {
      success: false,
      message: error.message,
    };
  }
});

// 删除用户
router.delete("/:id", async (ctx) => {
  console.log("ctx", ctx.params);

  try {
    await DB.query("DELETE FROM users WHERE id = ?", [ctx.params.id]);
    ctx.body = {
      success: true,
      message: "删除成功",
    };
  } catch (error) {
    ctx.body = {
      success: false,
      message: error.message,
    };
  }
});

module.exports = router;
