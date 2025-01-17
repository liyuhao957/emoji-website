const path = require('path');
const fs = require('fs');
const defaultConfig = require('./default');

class Config {
    constructor() {
        this.env = process.env.NODE_ENV || 'development';
        this.isDev = this.env === 'development';
        
        // 加载并合并配置
        const envConfig = require('./' + this.env);
        this.config = this.mergeConfig(defaultConfig, envConfig);
        
        // 处理路径
        this.resolvePaths();
        
        // 确保必要的目录存在
        this.ensureDirectories();
        
        // 冻结配置防止修改
        Object.freeze(this);
    }

    mergeConfig(base, override) {
        const merged = { ...base };
        for (const [key, value] of Object.entries(override)) {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                merged[key] = this.mergeConfig(base[key] || {}, value);
            } else {
                merged[key] = value;
            }
        }
        return merged;
    }

    resolvePaths() {
        const rootDir = path.resolve(__dirname, '..');
        Object.keys(this.config.paths).forEach(key => {
            const relativePath = this.config.paths[key];
            this.config.paths[key] = path.resolve(rootDir, relativePath);
        });
    }

    ensureDirectories() {
        Object.values(this.config.paths).forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    }

    get(path) {
        return path.split('.').reduce((obj, key) => obj && obj[key], this.config);
    }
}

module.exports = new Config(); 