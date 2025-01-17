const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class CacheService {
    constructor() {
        this.cacheDir = path.join(__dirname, '../../cache');
        if (!fs.existsSync(this.cacheDir)) {
            fs.mkdirSync(this.cacheDir, { recursive: true });
        }
    }

    getCacheKey(url) {
        return crypto.createHash('md5').update(url).digest('hex');
    }

    getCachePath(key) {
        return path.join(this.cacheDir, key);
    }

    async get(url) {
        const key = this.getCacheKey(url);
        const cachePath = this.getCachePath(key);
        
        if (fs.existsSync(cachePath)) {
            return fs.createReadStream(cachePath);
        }
        return null;
    }

    async set(url, stream) {
        const key = this.getCacheKey(url);
        const cachePath = this.getCachePath(key);
        const writeStream = fs.createWriteStream(cachePath);
        stream.pipe(writeStream);
        return new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });
    }
}

module.exports = new CacheService(); 