class API {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api';
    }

    // 处理响应
    async handleResponse(response) {
        const contentType = response.headers.get('content-type');
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || '服务器内部错误');
        }
        
        // 如果是JSON响应，解析为JSON
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        }
        
        // 如果是图片响应，返回blob
        if (contentType && contentType.includes('image/')) {
            const blob = await response.blob();
            return {
                status: 'success',
                data: blob
            };
        }
        
        throw new Error('不支持的响应类型');
    }

    // 获取表情包列表
    async getEmojis(url) {
        const response = await fetch(`${this.baseUrl}/emojis?url=${encodeURIComponent(url)}`);
        return this.handleResponse(response);
    }

    // 下载表情包
    async downloadEmoji(url) {
        const response = await fetch(`${this.baseUrl}/download?url=${encodeURIComponent(url)}`);
        return this.handleResponse(response);
    }
}

// 导出API实例
window.api = new API(); 