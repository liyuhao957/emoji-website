class API {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api';
    }

    // 处理响应
    async handleResponse(response) {
        const data = await response.json();
        if (data.status === 'success') {
            return data;
        }
        throw new Error(data.message || '服务器内部错误');
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