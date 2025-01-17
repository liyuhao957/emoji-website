const { AppError } = require('../utils/error-handler');
const crawlerService = require('../services/crawler');
const downloadService = require('../services/download');
const cacheService = require('../services/cache');
const config = require('../../config');
const axios = require('axios');

class EmojiController {
    constructor() {
        // 绑定方法到实例
        this.parseUrl = this.parseUrl.bind(this);
        this.getEmojis = this.getEmojis.bind(this);
        this.downloadEmoji = this.downloadEmoji.bind(this);
        this.getImage = this.getImage.bind(this);
    }

    // 解析输入的URL
    parseUrl(url) {
        const baseUrl = 'https://www.fabiaoqing.com';
        const httpBaseUrl = 'http://www.fabiaoqing.com';
        
        // 如果是完整URL，直接返回
        if (url.startsWith(baseUrl) || url.startsWith(httpBaseUrl) || 
            url.startsWith(baseUrl.replace('www.', '')) || 
            url.startsWith(httpBaseUrl.replace('www.', ''))) {
            return url;
        }
        
        // 如果是相对路径，拼接baseUrl
        if (url.startsWith('/')) {
            return `${baseUrl}${url}`;
        }
        
        throw new AppError('无效的URL格式', 400);
    }

    // 获取表情包列表
    async getEmojis(req, res) {
        const { url } = req.query;
        if (!url) {
            throw new AppError('请提供表情包链接', 400);
        }

        console.log('收到请求URL:', url);
        const fullUrl = this.parseUrl(url);
        console.log('解析后的URL:', fullUrl);

        try {
            const images = await crawlerService.crawlPage(fullUrl);
            console.log('爬取成功，图片数量:', images.length);

            res.json({
                status: 'success',
                data: {
                    images
                }
            });
        } catch (error) {
            console.error('控制器错误:', error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError('获取表情包失败: ' + error.message, 500);
        }
    }

    // 下载表情包
    async downloadEmoji(req, res) {
        const { url } = req.query;
        if (!url) {
            throw new AppError('请提供图片链接', 400);
        }

        let tempFile = null;
        try {
            // 下载图片
            const result = await downloadService.downloadImage(url);
            tempFile = result.path;

            // 设置响应头
            res.setHeader('Content-Type', result.contentType);
            res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);

            // 发送文件
            res.sendFile(result.path, err => {
                if (err) {
                    console.error('发送文件失败:', err);
                }
                // 清理临时文件
                downloadService.cleanup(result.path);
            });
        } catch (error) {
            // 清理临时文件
            if (tempFile) {
                downloadService.cleanup(tempFile);
            }
            throw new AppError('下载失败: ' + error.message, 500);
        }
    }

    async getImage(req, res) {
        const { url } = req.query;
        if (!url) {
            throw new AppError('请提供图片链接', 400);
        }

        try {
            // 检查缓存
            const cached = await cacheService.get(url);
            if (cached) {
                // 设置跨域头
                res.set({
                    'Access-Control-Allow-Origin': '*',
                    'Cross-Origin-Resource-Policy': 'cross-origin'
                });
                return cached.pipe(res);
            }

            // 获取图片
            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream',
                headers: {
                    'Referer': 'https://fabiaoqing.com/',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            // 缓存图片
            await cacheService.set(url, response.data);

            // 返回图片
            res.set({
                'Content-Type': response.headers['content-type'],
                'Access-Control-Allow-Origin': '*',
                'Cross-Origin-Resource-Policy': 'cross-origin'
            });
            response.data.pipe(res);
        } catch (error) {
            throw new AppError('获取图片失败: ' + error.message, 500);
        }
    }
}

module.exports = new EmojiController(); 