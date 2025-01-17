const express = require('express');
const router = express.Router();
const emojiController = require('../controllers/emoji');
const { catchAsync } = require('../utils/error-handler');

// 解析表情包链接
router.post('/parse', catchAsync(emojiController.parseUrl));

// 获取表情包列表
router.get('/emojis', catchAsync(emojiController.getEmojis));

// 下载表情包
router.get('/download', catchAsync(emojiController.downloadEmoji));

// 代理图片
router.get('/proxy', catchAsync(emojiController.proxyImage));

// 获取图片
router.get('/image', catchAsync(emojiController.getImage));

module.exports = router; 