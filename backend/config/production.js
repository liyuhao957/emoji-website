module.exports = {
    server: {
        host: '0.0.0.0'  // 允许所有IP访问
    },

    crawler: {
        headless: true,          // 无头模式
        slowMo: 0,              // 不延迟
        devtools: false,        // 关闭开发者工具
        concurrent: 5           // 增加并发数
    },

    security: {
        cors: {
            origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
            credentials: true
        },
        rateLimit: {
            max: 100            // 限制请求次数
        }
    },

    log: {
        level: 'info',
        console: false         // 生产环境不输出到控制台
    }
}; 