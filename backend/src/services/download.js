const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const config = require('../../config');
const { AppError } = require('../utils/error-handler');

class DownloadService {
    constructor() {
        this.tempDir = config.get('paths.temp');
        // 确保临时目录存在
        if (!fs.existsSync(this.tempDir)) {
            fs.mkdirSync(this.tempDir, { recursive: true });
        }
    }

    // 获取图片扩展名
    getExtension(url) {
        const ext = path.extname(url).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
            return ext;
        }
        return '.png'; // 默认扩展名
    }

    // 生成临时文件路径
    getTempFilePath(url) {
        const ext = this.getExtension(url);
        const filename = `emoji_${Date.now()}${ext}`;
        return path.join(this.tempDir, filename);
    }

    // 下载图片
    async downloadImage(url) {
        const browser = await chromium.launch({
            headless: true
        });

        try {
            const context = await browser.newContext({
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            });

            const page = await context.newPage();
            const response = await page.goto(url);

            if (!response.ok()) {
                throw new AppError('图片下载失败', 404);
            }

            const buffer = await response.body();
            const tempPath = this.getTempFilePath(url);
            
            // 保存图片到临时文件
            fs.writeFileSync(tempPath, buffer);

            return {
                path: tempPath,
                filename: path.basename(tempPath),
                contentType: response.headers()['content-type']
            };
        } finally {
            await browser.close();
        }
    }

    // 清理临时文件
    cleanup(filePath) {
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (error) {
            console.error('清理临时文件失败:', error);
        }
    }
}

module.exports = new DownloadService(); 