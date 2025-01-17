module.exports = {
    // 服务器配置
    server: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost'
    },

    // 路径配置
    paths: {
        root: '.',
        logs: './logs',
        temp: './temp'
    },

    // API配置
    api: {
        prefix: '/api',
        timeout: process.env.API_TIMEOUT || 5000
    },

    // 爬虫配置
    crawler: {
        baseUrl: 'https://www.fabiaoqing.com',
        timeout: parseInt(process.env.CRAWLER_TIMEOUT || '15000', 10),
        retries: 3,
        concurrent: process.env.CRAWLER_CONCURRENT || 2,
        headless: true,
        selectors: {
            images: '.searchbqppdiv img[src], .bqppdiv1 img[src], .tagbqppdiv img[src], .bqpp img[src], .biaoqing_list img[src]',
            title: '.bqba, .ui-title'
        }
    },

    // 安全配置
    security: {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
            maxAge: 86400
        },
        rateLimit: {
            windowMs: process.env.RATE_LIMIT_WINDOW || 900000, // 15分钟
            max: process.env.RATE_LIMIT_MAX || 100
        }
    },

    // 日志配置
    log: {
        level: process.env.LOG_LEVEL || 'info',
        filename: 'app-%DATE%.log',
        maxFiles: '14d'
    }
}; 