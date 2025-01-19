// 先引入脚本
const zipScript = document.createElement('script');
zipScript.src = '../../node_modules/jszip/dist/jszip.min.js';
document.head.appendChild(zipScript);

const saveAsScript = document.createElement('script');
saveAsScript.src = '../../node_modules/file-saver/dist/FileSaver.min.js';
document.head.appendChild(saveAsScript);

// 等待脚本加载完成
await Promise.all([
    new Promise(resolve => zipScript.onload = resolve),
    new Promise(resolve => saveAsScript.onload = resolve)
]);

class ZipHelper {
    constructor() {
        // @ts-ignore
        this.zip = new JSZip();
        this.maxFileSize = 50 * 1024 * 1024; // 50MB
        this.maxFiles = 100; // 最大文件数量
    }

    /**
     * 获取文件名（从URL中提取或生成）
     * @param {string} url 图片URL
     * @returns {string} 文件名
     */
    getFileName(url) {
        try {
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/');
            return pathParts[pathParts.length - 1];
        } catch (error) {
            return `emoji_${Date.now()}.jpg`;
        }
    }

    /**
     * 获取图片数据
     * @param {string} url 图片URL
     * @returns {Promise<Blob>} 图片数据
     */
    async fetchImage(url) {
        try {
            const response = await window.api.downloadEmoji(url);
            if (response.status !== 'success' || !response.data) {
                throw new Error('Failed to fetch image');
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching image:', error);
            throw error;
        }
    }

    /**
     * 添加图片到zip
     * @param {string} url 图片URL
     * @param {Function} onProgress 进度回调
     */
    async addImage(url, onProgress) {
        try {
            const blob = await this.fetchImage(url);
            if (blob.size > this.maxFileSize) {
                throw new Error('File too large');
            }
            const fileName = this.getFileName(url);
            this.zip.file(fileName, blob);
            if (onProgress) {
                onProgress(fileName);
            }
        } catch (error) {
            console.error('Error adding image:', error);
            throw error;
        }
    }

    /**
     * 批量添加图片
     * @param {string[]} urls 图片URL数组
     * @param {Function} onProgress 进度回调
     */
    async addImages(urls, onProgress) {
        if (urls.length > this.maxFiles) {
            throw new Error(`Too many files. Maximum allowed: ${this.maxFiles}`);
        }

        for (let i = 0; i < urls.length; i++) {
            await this.addImage(urls[i], onProgress);
        }
    }

    /**
     * 生成并下载zip文件
     * @param {string} filename zip文件名
     * @param {Function} onComplete 完成回调
     */
    async download(filename = 'emojis.zip', onComplete) {
        try {
            const content = await this.zip.generateAsync({
                type: 'blob',
                compression: 'DEFLATE',
                compressionOptions: {
                    level: 6
                }
            }, metadata => {
                if (onComplete) {
                    onComplete(metadata.percent);
                }
            });

            // @ts-ignore
            saveAs(content, filename);
        } catch (error) {
            console.error('Error generating zip:', error);
            throw error;
        }
    }

    /**
     * 重置zip实例
     */
    reset() {
        // @ts-ignore
        this.zip = new JSZip();
    }
}

export default ZipHelper; 