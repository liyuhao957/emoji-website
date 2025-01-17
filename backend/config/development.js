module.exports = {
    server: {
        port: 3000,
        host: 'localhost'
    },

    crawler: {
        headless: false,  // 开发时显示浏览器
        slowMo: 50,      // 放慢操作便于调试
        devtools: true   // 开启开发者工具
    },

    log: {
        level: 'debug',
        console: true    // 开发环境输出到控制台
    },

    security: {
        rateLimit: {
            max: 0       // 开发环境禁用请求限制
        }
    }
}; 