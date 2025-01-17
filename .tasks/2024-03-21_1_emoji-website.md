# Context
任务文件名: 2024-03-21_1_emoji-website
创建时间: 2024-03-21_10:30:00
创建者: user
YOLO模式: 关闭

# 任务描述
创建表情包网站的前后端基础框架

# 项目概述
一个基于HTML+JavaScript+CSS和Node.js的表情包网站项目，需要实现以下功能：
1. 数据来源：爬取 fabiaoqing.com 网站的表情包，包含三种页面格式：
   - 详情页：如 /bqb/detail/id/{id}
   - 列表页：如 /biaoqing
   - 搜索页：如 /search/bqb/keyword/{keyword}/type/bq/page/{page}

2. 核心功能：
   - 前端功能：
     - 输入链接展示对应页面的表情包
     - 表情包预览（支持jpg、png、gif格式）
     - 表情包选中下载功能
   - 后端功能：
     - 解析输入链接
     - 爬取目标页面的表情包
     - 提供API接口给前端调用
     - 支持多种图片格式的处理（jpg、png、gif）

3. 技术栈：
   - 前端：HTML + JavaScript + CSS
   - 后端：Node.js
   - 数据存储：不需要存储数据

4. 开发优先级：
   - 第一阶段：基础框架搭建和单个链接解析
   - 第二阶段：完善界面和下载功能

5. 部署规划：
   - 服务器环境：
     - Node.js 运行环境
     - Nginx 反向代理
     - PM2 进程管理
     - SSL 证书（可选）
   
   - 目录结构：
     ```
     emoji/                     # 项目根目录
     ├── .tasks/               # 任务文件
     ├── docs/                 # 项目文档
     ├── frontend/             # 前端代码
     │   ├── index.html       # 主页面
     │   ├── css/             # 样式文件
     │   ├── js/              # JavaScript文件
     │   └── assets/          # 静态资源
     ├── backend/             # 后端代码
     │   ├── src/             # 源代码
     │   ├── config/          # 配置文件
     │   └── logs/            # 日志文件
     └── nginx/               # Nginx配置
     ```

6. 可维护性设计：
   - 项目结构设计：
     ```
     emoji-website/                # 项目根目录
     ├── frontend/                # 前端代码
     │   ├── index.html          # 主页面
     │   ├── css/                # 样式文件
     │   │   ├── main.css       # 主样式
     │   │   └── components/    # 组件样式
     │   ├── js/                 # JavaScript文件
     │   │   ├── main.js        # 主逻辑
     │   │   ├── api.js         # API调用
     │   │   └── utils/         # 工具函数
     │   └── assets/            # 静态资源
     │       └── images/        # 图片资源
     │
     ├── backend/                # 后端代码
     │   ├── src/               # 源代码
     │   │   ├── app.js        # 应用入口
     │   │   ├── routes/       # 路由定义
     │   │   ├── controllers/  # 控制器
     │   │   ├── services/     # 业务逻辑
     │   │   └── utils/        # 工具函数
     │   ├── config/           # 配置文件
     │   │   ├── index.js      # 配置入口
     │   │   ├── default.js    # 默认配置
     │   │   ├── development.js # 开发环境配置
     │   │   └── production.js # 生产环境配置
     │   └── logs/             # 日志文件
     │
     ├── scripts/               # 脚本文件
     │   ├── dev.js            # 开发环境脚本
     │   └── deploy.js         # 部署脚本
     │
     ├── .env.example          # 环境变量示例
     ├── .gitignore           # Git忽略文件
     ├── package.json         # 项目配置
     └── README.md           # 项目说明
     ```

   - 开发环境目录说明：
     1. frontend/：前端相关文件
        - 使用原生HTML/CSS/JS，避免框架依赖
        - 按功能模块组织代码
        - 资源文件集中管理

     2. backend/：后端相关文件
        - 清晰的分层结构（路由->控制器->服务）
        - 配置文件集中管理
        - 日志文件独立存放

     3. scripts/：自动化脚本
        - 开发环境启动脚本
        - 部署和构建脚本

     4. 根目录配置文件：
        - 环境变量模板
        - Git配置
        - 项目整体配置

   - 目录规范：
     1. 使用相对路径：
        - 所有路径都相对于项目根目录
        - 通过配置文件管理路径
        - 避免硬编码绝对路径

     2. 资源管理：
        - 静态资源集中存放
        - 按类型分类存储
        - 通过配置文件指定路径

     3. 配置文件：
        - 分环境配置
        - 敏感信息使用环境变量
        - 本地配置通过.gitignore排除

# 任务分析
- 目的：搭建一个能够展示和下载表情包的网站
- 实现重点：
  - 链接解析系统
  - 爬虫服务
  - 图片展示和下载
  - 多格式图片支持（jpg、png、gif）
- 技术要点：
  - 页面爬取和解析
  - 图片处理（需要处理不同格式）
  - 前后端交互

- 部署和维护重点：
  - 环境配置：
    - 开发环境与生产环境分离
    - 配置文件管理
    - 进程管理和监控
  
  - 代码组织：
    - 模块化设计
    - 错误处理机制
    - 日志记录系统
  
  - 性能优化：
    - 静态资源优化
    - 缓存策略
    - 并发处理
  
  - 安全考虑：
    - XSS防护
    - 请求限流
    - 错误信息处理
    - 敏感信息保护

# 主分支
master

# 任务分支
task/emoji-website-init_2024-03-21

# 执行步骤
1. 创建项目基础结构
   - 创建项目目录
   - 初始化Git仓库和分支
   - 添加基础配置文件（.gitignore, .env.example等）
   - 添加开发工具配置（VSCode, ESLint, Prettier）

2. 实现前端基础功能
   - 创建HTML基础结构：
     - 输入框：用于输入表情包链接
     - 展示区：用于显示表情包
     - 下载区：用于选择和下载
   - 编写CSS样式：
     - 响应式布局
     - 图片网格展示
     - 加载和错误状态样式
   - 实现基础JS功能：
     - 链接输入和验证
     - 图片展示和预览
     - Mock数据测试
     - 下载功能（预留）

3. 实现后端基础功能
   - 配置系统实现
   - 设置Express服务器
   - 实现链接解析API
   - 实现爬虫功能
   - 实现下载接口
   - 错误处理和日志

4. 前后端联调
   - 对接API接口
   - 完善错误处理
   - 优化用户体验
   - 添加加载状态
   - 实现下载功能

5. 部署准备（可选）
   - 准备服务器环境
   - 配置Nginx
   - 设置PM2
   - 配置SSL

6. 监控和维护
   - 设置日志系统
   - 配置错误监控
   - 性能监控
   - 定期备份

# 当前执行步骤: 1

# 任务进度
2024-03-21_10:30:00 - 任务初始化完成，等待开始实施
2024-03-21_16:00:00 - 开始创建项目基础结构
2024-03-21_16:05:00 - 创建项目目录结构
2024-03-21_16:10:00 - 初始化Git仓库和分支
2024-03-21_16:15:00 - 创建并配置开发工具相关文件
2024-03-21_16:20:00 - 重新规划目录结构，确保符合项目规范
2024-03-21_16:25:00 - 调整目录结构，将前后端分离到根目录
2024-03-21_16:30:00 - 配置 VSCode 设置和 Git 忽略文件
2024-03-21_16:35:00 - 创建并配置 Prettier
2024-03-21_16:40:00 - 创建并配置 ESLint
2024-03-21_16:45:00 - 创建环境变量示例文件
2024-03-21_16:50:00 - 创建项目说明文档
2024-03-21_16:55:00 - 更新项目目录结构说明
2024-03-21_17:00:00 - 创建前端基础界面（HTML结构）
2024-03-21_17:05:00 - 添加前端样式（CSS）
2024-03-21_17:10:00 - 实现前端基础交互（JavaScript）
2024-03-21_17:15:00 - 添加数据来源说明和版权信息
2024-03-21_17:20:00 - 创建后端基础框架（Express应用）
2024-03-21_17:25:00 - 实现错误处理机制
2024-03-21_17:30:00 - 创建爬虫服务
2024-03-21_17:35:00 - 创建路由和控制器
2024-03-21_17:40:00 - 创建后端配置文件
2024-03-21_17:45:00 - 创建后端环境变量配置
2024-03-21_17:50:00 - 创建下载服务
2024-03-21_17:55:00 - 实现下载接口
2024-03-21_18:00:00 - 优化下载体验（添加进度显示）
2024-03-21_18:05:00 - 添加图片加载状态和错误处理
2024-03-21_18:10:00 - 优化用户界面反馈（Toast提示）
2024-03-21_18:15:00 - 创建项目说明文档
2024-03-21_18:20:00 - 创建测试用例
2024-03-21_18:25:00 - 实现测试运行器
2024-03-21_18:30:00 - 安装测试依赖
2024-03-21_18:35:00 - 修复路径导入错误
2024-03-21_18:40:00 - 修复方法绑定问题
2024-03-21_18:45:00 - 优化URL解析逻辑
2024-03-21_18:50:00 - 修复爬虫浏览器配置（强制无头模式）
2024-03-21_18:55:00 - 修复配置类型转换问题
2024-03-21_19:00:00 - 优化爬虫重试机制
2024-03-21_19:05:00 - 修复图片选择器配置
2024-03-21_19:10:00 - 优化图片数据处理逻辑
2024-03-21_19:15:00 - 处理图片懒加载问题
2024-03-21_19:20:00 - 增强爬虫调试功能
2024-03-21_19:25:00 - 修复图片爬取成功
2024-03-21_19:30:00 - 优化前端图片错误处理
2024-03-21_19:35:00 - 增强前端调试功能
2024-03-21_19:40:00 - 优化图片加载重试机制
2024-03-21_19:45:00 - 添加图片代理功能解决跨域问题
2024-03-21_19:50:00 - 安装图片代理所需依赖
2024-03-21_19:55:00 - 修复图片代理URL格式问题
2024-03-21_20:00:00 - 添加静态文件服务
2024-03-21_20:05:00 - 修复API调用地址问题
2024-03-21_20:10:00 - 优化图片加载策略
2024-03-21_20:15:00 - 添加图片缓存功能
2024-03-21_20:20:00 - 修复前端访问方式
2024-03-21_20:25:00 - 优化速率限制配置
2024-03-21_20:30:00 - 修复图片跨域问题
2024-03-21_20:35:00 - 更新项目配置文件

# 历史经验参考
以下是之前开发过程中遇到的主要问题和解决方案：

1. 前端开发要点：
   - 图片加载失败需要添加备用域名
   - 图片加载证书问题可使用 http 协议解决
   - 跨域问题可通过后端代理解决
   - URL解析需要考虑多种协议和域名格式
   - 使用内联SVG作为错误图片，避免额外请求
   - 添加详细的调试日志便于排查问题
   - 图片加载失败时添加重试机制提高成功率
   - 图片跨域问题通过后端代理加载解决
   - 使用axios处理图片流数据更可靠
   - 代理URL需要使用完整的域名和协议
   - 使用HTTP服务器提供前端页面
   - API调用需要使用完整的服务器地址
   - 优先使用原站图片，避免代理失败
   - 图片缓存可以提高加载速度和成功率
   - 前端页面需要通过HTTP服务器访问
   - 图片代理需要更宽松的速率限制
   - 图片代理需要设置正确的跨域头
   - 项目配置文件需要统一管理

2. 后端开发要点：
   - Express路由可能遇到类型定义问题，可使用类型断言解决
   - 爬虫建议直接使用 playwright 而不是 puppeteer
   - 需要处理反爬虫问题
   - 图片去重和标题处理很重要
   - 控制器方法需要在构造函数中绑定this
   - 不同页面的图片选择器可能不同，需要全面覆盖
   - 图片可能存在于src或data-original属性中
   - 需要处理图片懒加载，通过滚动触发加载
   - 爬虫调试需要保存错误现场和详细日志
   - 直接选择带data-original属性的图片更可靠

3. 开发顺序建议：
   ```
   [详细的时间线记录]
   // ... 原任务进度中的所有记录 ...
   ```

# 最终审查
[待项目完成后填写] 

# 配置系统实现：
   - 配置文件结构：
     1. 配置文件结构：
        ```javascript
        // backend/config/default.js - 默认配置
        module.exports = {
          // 服务器配置
          server: {
            port: 3000,
            host: 'localhost'
          },

          // 路径配置（使用相对路径）
          paths: {
            root: '.',
            frontend: './frontend',
            static: './frontend/assets',
            logs: './backend/logs',
            temp: './temp'
          },

          // API配置
          api: {
            prefix: '/api',
            timeout: 5000
          },

          // 爬虫配置
          crawler: {
            target: 'http://fabiaoqing.com',
            timeout: 10000,
            retries: 3,
            concurrent: 2,
            selectors: {
              images: '.img-list img',
              title: '.title'
            }
          },

          // 日志配置
          log: {
            level: 'info',
            filename: 'app-%DATE%.log'
          }
        };

        // backend/config/development.js - 开发环境配置
        module.exports = {
          server: {
            port: 3000,
            host: 'localhost'
          },
          log: {
            level: 'debug',
            console: true
          },
          crawler: {
            headless: false,  // 开发时显示浏览器
            slowMo: 100      // 放慢操作便于调试
          }
        };

        // backend/config/production.js - 生产环境配置
        module.exports = {
          server: {
            port: process.env.PORT || 3000,
            host: '0.0.0.0'
          },
          paths: {
            logs: process.env.LOG_PATH || '/var/log/emoji-website'
          },
          log: {
            level: 'info',
            console: false
          },
          crawler: {
            headless: true,
            concurrent: 5
          }
        };

        // backend/config/index.js - 配置加载器
        const path = require('path');
        const fs = require('fs');

        class Config {
          constructor() {
            this.env = process.env.NODE_ENV || 'development';
            this.isDev = this.env === 'development';
            
            // 加载配置
            this.loadConfig();
            
            // 处理路径
            this.resolvePaths();
            
            // 确保必要的目录存在
            this.ensureDirectories();
            
            // 冻结配置防止修改
            Object.freeze(this);
          }

          loadConfig() {
            // 1. 加载默认配置
            const defaultConfig = require('./default');
            
            // 2. 加载环境配置
            const envConfig = require('./' + this.env);
            
            // 3. 合并配置
            this.config = this.mergeConfig(defaultConfig, envConfig);
            
            // 4. 环境变量覆盖
            this.loadEnvOverrides();
          }

          mergeConfig(base, override) {
            // 深度合并配置对象
            return {...base, ...override};
          }

          resolvePaths() {
            const rootDir = path.resolve(__dirname, '../..');
            
            // 解析所有相对路径为绝对路径
            Object.keys(this.config.paths).forEach(key => {
              const relativePath = this.config.paths[key];
              this.config.paths[key] = path.resolve(rootDir, relativePath);
            });
          }

          ensureDirectories() {
            // 确保必要的目录存在
            Object.values(this.config.paths).forEach(dir => {
              if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
              }
            });
          }

          loadEnvOverrides() {
            // 环境变量覆盖配置
            const envMap = {
              PORT: 'server.port',
              HOST: 'server.host',
              LOG_LEVEL: 'log.level',
              API_TIMEOUT: 'api.timeout'
            };

            Object.entries(envMap).forEach(([envKey, configPath]) => {
              if (process.env[envKey]) {
                const value = process.env[envKey];
                const keys = configPath.split('.');
                let current = this.config;
                
                keys.slice(0, -1).forEach(key => {
                  current = current[key] = current[key] || {};
                });
                
                current[keys[keys.length - 1]] = value;
              }
            });
          }

          get(path) {
            // 获取配置值
            return path.split('.').reduce((obj, key) => obj && obj[key], this.config);
          }

          validate() {
            // 验证必要的配置是否存在
            const required = [
              'server.port',
              'server.host',
              'paths.root',
              'paths.logs'
            ];

            required.forEach(path => {
              if (!this.get(path)) {
                throw new Error(`Missing required config: ${path}`);
              }
            });
          }
        }

        module.exports = new Config();
        ```

     2. 环境变量模板：
        ```bash
        # .env.example
        # 基础配置
        NODE_ENV=development
        PORT=3000
        HOST=localhost

        # 路径配置（生产环境使用）
        LOG_PATH=/var/log/emoji-website
        TEMP_PATH=/tmp/emoji-website

        # API配置
        API_TIMEOUT=5000

        # 爬虫配置
        CRAWLER_CONCURRENT=5
        CRAWLER_TIMEOUT=10000

        # 日志配置
        LOG_LEVEL=info
        ```

     3. 使用示例：
        ```javascript
        // 在代码中使用配置
        const config = require('../config');

        // 获取配置值
        const port = config.get('server.port');
        const logsDir = config.get('paths.logs');

        // 验证配置
        config.validate();

        // 判断环境
        if (config.isDev) {
          console.log('Running in development mode');
        }

        // 使用路径
        const logFile = path.join(config.get('paths.logs'), 'app.log');
        ```

这样的配置系统特点：
1. 环境分离：开发和生产环境配置分开
2. 路径灵活：使用相对路径，易于迁移
3. 配置分层：默认配置->环境配置->环境变量
4. 类型安全：可以添加TypeScript支持
5. 开发友好：开发环境提供更多调试信息
6. 生产安全：生产环境关闭调试功能
7. 可扩展：易于添加新的配置项
8. 维护方便：集中管理所有配置 

7. 开发工具配置：
   - VSCode 配置：
     ```json
     // .vscode/settings.json
     {
       "editor.formatOnSave": true,
       "editor.defaultFormatter": "esbenp.prettier-vscode",
       "editor.codeActionsOnSave": {
         "source.fixAll.eslint": true
       },
       "files.exclude": {
         "node_modules": true,
         "*.log": true
       },
       "search.exclude": {
         "node_modules": true,
         "logs": true
       }
     }
     ```

   - ESLint 配置：
     ```javascript
     // .eslintrc.js
     module.exports = {
       env: {
         node: true,
         browser: true,
         es2021: true
       },
       extends: ['eslint:recommended'],
       rules: {
         'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
         'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
       }
     }
     ```

   - Prettier 配置：
     ```json
     // .prettierrc
     {
       "semi": true,
       "singleQuote": true,
       "tabWidth": 2,
       "printWidth": 100,
       "trailingComma": "es5",
       "bracketSpacing": true,
       "arrowParens": "avoid",
       "endOfLine": "lf"
     }
     ```

   - Git 配置：
     ```gitignore
     # .gitignore
     node_modules/
     logs/
     *.log
     .env
     .env.*
     !.env.example
     .DS_Store
     temp/
     ```

2. 错误处理机制：
   ```javascript
   // backend/src/utils/error-handler.js
   class AppError extends Error {
     constructor(message, statusCode = 500) {
       super(message);
       this.statusCode = statusCode;
       this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
       this.isOperational = true;
       Error.captureStackTrace(this, this.constructor);
     }
   }

   const errorHandler = (err, req, res, next) => {
     err.statusCode = err.statusCode || 500;
     err.status = err.status || 'error';

     if (config.isDev) {
       res.status(err.statusCode).json({
         status: err.status,
         error: err,
         message: err.message,
         stack: err.stack
       });
     } else {
       // 生产环境只返回必要信息
       res.status(err.statusCode).json({
         status: err.status,
         message: err.isOperational ? err.message : '服务器内部错误'
       });
     }
   };
   ```

3. 安全配置：
   ```javascript
   // backend/config/security.js
   module.exports = {
     // CORS配置
     cors: {
       origin: process.env.NODE_ENV === 'development' ? '*' : process.env.ALLOWED_ORIGINS,
       methods: ['GET', 'POST'],
       credentials: true,
       maxAge: 86400
     },
     
     // 请求限制
     rateLimit: {
       windowMs: 15 * 60 * 1000, // 15分钟
       max: process.env.NODE_ENV === 'development' ? 0 : 100
     },
     
     // 安全头部
     helmet: {
       contentSecurityPolicy: {
         directives: {
           defaultSrc: ["'self'"],
           imgSrc: ["'self'", 'http:', 'https:', 'data:'],
           scriptSrc: ["'self'", "'unsafe-inline'"],
           styleSrc: ["'self'", "'unsafe-inline'"]
         }
       }
     }
   };
   ```

4. 日志配置：
   ```javascript
   // backend/config/logger.js
   const winston = require('winston');
   require('winston-daily-rotate-file');

   module.exports = {
     format: winston.format.combine(
       winston.format.timestamp(),
       winston.format.json()
     ),
     transports: [
       new winston.transports.DailyRotateFile({
         filename: 'logs/error-%DATE%.log',
         datePattern: 'YYYY-MM-DD',
         level: 'error',
         maxFiles: '14d'
       }),
       new winston.transports.DailyRotateFile({
         filename: 'logs/combined-%DATE%.log',
         datePattern: 'YYYY-MM-DD',
         maxFiles: '14d'
       })
     ]
   };
   ```

这些补充可以让项目的开发更加规范和安全。你觉得还需要补充什么吗？ 