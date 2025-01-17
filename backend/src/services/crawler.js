const { chromium } = require('playwright');
const config = require('../../config');
const { AppError } = require('../utils/error-handler');

class CrawlerService {
    constructor() {
        this.browser = null;
        this.context = null;
    }

    async init() {
        // 初始化浏览器
        this.browser = await chromium.launch({
            headless: true,
            slowMo: config.get('crawler.slowMo')
        });

        // 创建上下文，设置反爬虫策略
        this.context = await this.browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            viewport: { width: 1920, height: 1080 },
            // 添加额外的 headers
            extraHTTPHeaders: {
                'Accept-Language': 'zh-CN,zh;q=0.9',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
            }
        });
    }

    async crawlPage(url) {
        const maxRetries = config.get('crawler.retries') || 3;
        let lastError = null;

        for (let i = 0; i < maxRetries; i++) {
            if (!this.browser) await this.init();
            
            const page = await this.context.newPage();
            try {
                console.log('开始访问页面...');
                await page.goto(url, {
                    waitUntil: 'domcontentloaded',
                    timeout: parseInt(config.get('crawler.timeout'), 10)
                });
                console.log('页面加载完成');

                // 等待页面内容加载
                await page.waitForSelector('.biaoqing_list', { timeout: 10000 })
                    .catch(() => console.log('未找到.biaoqing_list选择器'));

                // 获取页面HTML用于调试
                const html = await page.content();
                console.log('页面HTML片段:', html.substring(0, 500));

                // 滚动页面以触发懒加载
                console.log('开始滚动页面...');
                await page.evaluate(() => {
                    return new Promise((resolve) => {
                        let totalHeight = 0;
                        const distance = 100;
                        const timer = setInterval(() => {
                            const scrollHeight = document.body.scrollHeight;
                            window.scrollBy(0, distance);
                            totalHeight += distance;
                            
                            if(totalHeight >= scrollHeight){
                                clearInterval(timer);
                                resolve();
                            }
                        }, 100);
                    });
                });
                console.log('页面滚动完成');

                // 检查图片元素
                const imageCount = await page.evaluate(() => {
                    const images = document.querySelectorAll('img');
                    const dataOriginalImages = document.querySelectorAll('img[data-original]');
                    return {
                        total: images.length,
                        withDataOriginal: dataOriginalImages.length,
                        sampleSrc: Array.from(images).slice(0, 3).map(img => ({
                            src: img.src,
                            dataOriginal: img.getAttribute('data-original')
                        }))
                    };
                });
                console.log('图片元素统计:', imageCount);

                // 获取图片和标题
                console.log('开始提取图片数据...');
                const images = await page.$$eval('.bqppdiv1 img, .tagbqppdiv img, .bqpp img, .searchbqppdiv img', imgs => 
                    imgs.map(img => ({
                        src: img.getAttribute('data-original') || img.src,
                        alt: img.alt || '',
                        title: img.title || ''
                    }))
                );

                console.log('找到图片数量:', images.length);
                console.log('图片列表:', images.map(img => img.src));

                // 图片去重和过滤
                const uniqueImages = [...new Map(images
                    .filter(img => img.src && !img.src.includes('placeholder'))
                    .map(img => [img.src, img])
                ).values()];

                console.log('去重后图片数量:', uniqueImages.length);
                return uniqueImages;
            } catch (error) {
                console.error(`爬虫错误 (尝试 ${i + 1}/${maxRetries}):`, error);
                lastError = error;
                
                // 截图保存错误现场
                try {
                    await page.screenshot({ path: `error-${Date.now()}.png`, fullPage: true });
                } catch (e) {
                    console.error('截图失败:', e);
                }

                await page.close();
                
                if (i < maxRetries - 1) {
                    console.log(`等待${2 * (i + 1)}秒后重试...`);
                    await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
                    continue;
                }
            } finally {
                await page.close();
            }
        }

        throw new AppError(`爬虫错误 (已重试${maxRetries}次): ${lastError.message}`, 500);
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
            this.context = null;
        }
    }
}

module.exports = new CrawlerService(); 