-- 创建数据库
CREATE DATABASE IF NOT EXISTS lion_mouse;
USE lion_mouse;

-- 创建用户表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL COMMENT '姓名',
    phone VARCHAR(20) NOT NULL COMMENT '电话',
    notify_feishu BOOLEAN DEFAULT false COMMENT '飞书提醒',
    notify_sms BOOLEAN DEFAULT false COMMENT '短信提醒',
    notify_phone BOOLEAN DEFAULT false COMMENT '电话提醒',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
);

-- 插入测试数据
INSERT INTO users (name, phone, notify_feishu, notify_sms, notify_phone) 
VALUES 
('张三', '13800138000', true, false, true),
('李四', '13900139000', false, true, false);