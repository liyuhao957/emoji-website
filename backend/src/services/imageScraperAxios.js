const axios = require('axios');
const cheerio = require('cheerio');

class ImageScraperAxios {
    constructor() {
        // 配置基础的请求头
        this.axiosInstance = axios.create({
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            },
            timeout: 10000, // 10秒超时
        });
    }

    /**
     * 判断是否为有效的图片URL
     * @param {string} url 图片URL
     * @returns {boolean} 是否有效
     */
    isValidImageUrl(url) {
        if (!url) return false;
        
        // 检查是否来自soutula.com
        if (!url.includes('img.soutula.com')) return false;
        
        // 检查是否为bmiddle或large目录下的图片
        if (!url.includes('/bmiddle/') && !url.includes('/large/')) return false;
        
        // 检查是否为图片格式
        return url.match(/\.(jpg|jpeg|png|gif)$/i) !== null;
    }

    /**
     * 获取页面图片
     * @param {string} url 目标URL
     * @returns {Promise<string[]>} 图片URL数组
     */
    async getImages(url) {
        try {
            console.log('收到请求URL:', url);
            
            // 发送GET请求获取页面内容
            const response = await this.axiosInstance.get(url, {
                headers: {
                    'Referer': 'https://www.fabiaoqing.com/',
                }
            });
            
            console.log('页面获取成功，开始解析...');
            
            // 使用cheerio加载HTML
            const $ = cheerio.load(response.data);
            
            // 提取图片URL
            const images = new Set();
            
            // 查找所有img标签
            $('img').each((_, element) => {
                const $img = $(element);
                const src = $img.attr('src');
                const dataOriginal = $img.attr('data-original');
                
                // 优先使用data-original属性
                const imageUrl = dataOriginal || src;
                
                // 验证图片URL
                if (this.isValidImageUrl(imageUrl)) {
                    images.add(imageUrl);
                }
            });
            
            const imageList = Array.from(images);
            console.log('找到图片数量:', imageList.length);
            console.log('图片列表:', imageList);
            
            return imageList;
        } catch (error) {
            console.error('获取图片失败:', error.message);
            throw error;
        }
    }
}

module.exports = ImageScraperAxios; 