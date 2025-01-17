const testCases = require('./test-cases');
const emojiController = require('../controllers/emoji');
const downloadService = require('../services/download');
const crawlerService = require('../services/crawler');
const { AppError } = require('../utils/error-handler');

class TestRunner {
    constructor() {
        this.results = {
            passed: 0,
            failed: 0,
            total: 0
        };
    }

    log(message, type = 'info') {
        const colors = {
            info: '\x1b[36m',    // 青色
            success: '\x1b[32m', // 绿色
            error: '\x1b[31m',   // 红色
            reset: '\x1b[0m'     // 重置
        };
        console.log(`${colors[type]}${message}${colors.reset}`);
    }

    async runTest(name, fn) {
        this.results.total++;
        try {
            await fn();
            this.results.passed++;
            this.log(`✓ ${name}`, 'success');
        } catch (error) {
            this.results.failed++;
            this.log(`✗ ${name}`, 'error');
            this.log(`  Error: ${error.message}`, 'error');
        }
    }

    async testUrlParsing() {
        for (const testCase of testCases.urlCases) {
            await this.runTest(`URL解析测试 - ${testCase.type}`, async () => {
                try {
                    const result = emojiController.parseUrl(testCase.url);
                    if (testCase.expected) {
                        if (!result.includes('fabiaoqing.com')) {
                            throw new Error('URL解析结果不正确');
                        }
                    }
                } catch (error) {
                    if (testCase.expected) {
                        throw error;
                    }
                }
            });
        }
    }

    async testImageDownload() {
        for (const testCase of testCases.imageCases) {
            await this.runTest(`图片下载测试 - ${testCase.type}`, async () => {
                try {
                    const result = await downloadService.downloadImage(testCase.url);
                    if (!result.path || !result.filename) {
                        throw new Error('下载结果格式不正确');
                    }
                    if (!result.contentType.includes(testCase.expected.format)) {
                        throw new Error('图片格式不匹配');
                    }
                } catch (error) {
                    if (testCase.expected.shouldLoad) {
                        throw error;
                    }
                } finally {
                    // 清理临时文件
                    if (result?.path) {
                        downloadService.cleanup(result.path);
                    }
                }
            });
        }
    }

    async testCrawler() {
        await this.runTest('爬虫测试 - 详情页', async () => {
            const url = 'https://www.fabiaoqing.com/bqb/detail/id/123';
            const images = await crawlerService.crawlPage(url);
            if (!Array.isArray(images) || images.length === 0) {
                throw new Error('爬虫未返回图片数据');
            }
        });
    }

    async testErrorHandling() {
        await this.runTest('错误处理测试', async () => {
            try {
                throw new AppError('测试错误', 400);
            } catch (error) {
                if (!(error instanceof AppError) || error.statusCode !== 400) {
                    throw new Error('错误处理不正确');
                }
            }
        });
    }

    printSummary() {
        console.log('\n测试结果汇总:');
        this.log(`总计: ${this.results.total}`, 'info');
        this.log(`通过: ${this.results.passed}`, 'success');
        this.log(`失败: ${this.results.failed}`, 'error');
    }

    async runAll() {
        this.log('\n开始运行测试...\n', 'info');
        
        await this.testUrlParsing();
        await this.testImageDownload();
        await this.testCrawler();
        await this.testErrorHandling();
        
        this.printSummary();
    }
}

// 运行测试
const runner = new TestRunner();
runner.runAll().catch(console.error); 