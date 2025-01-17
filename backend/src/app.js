const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const { errorHandler } = require('./utils/error-handler');
const config = require('../config');
const path = require('path');

const app = express();

// 基础中间件
app.use(helmet());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use(express.static(path.join(__dirname, '../../frontend')));

// 图片代理的速率限制
app.use('/api/image', rateLimit({
    windowMs: 1 * 60 * 1000, // 1分钟
    max: 100, // 每个IP每分钟100次请求
    message: { status: 'error', message: '请求过于频繁，请稍后再试' }
}));

// 其他API的速率限制
app.use('/api', rateLimit({
    windowMs: 15 * 60 * 1000, // 15分钟
    max: 100 // 每个IP每15分钟100次请求
}));

// API 路由（后续添加）
app.use('/api', require('./routes'));

// 错误处理
app.use(errorHandler);

// 启动服务器
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});

// 所有其他路由返回前端页面
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

module.exports = app; 