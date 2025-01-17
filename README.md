# 表情包下载器

一个简单的表情包下载工具，支持从 fabiaoqing.com 下载表情包。

## 功能特点

- 支持输入链接获取表情包
- 支持批量选择和下载
- 支持 JPG、PNG、GIF 格式
- 支持深色/浅色主题切换

## 快速开始

1. 克隆项目
```bash
git clone https://github.com/your-username/emoji-website.git
cd emoji-website
```

2. 安装依赖
```bash
# 安装后端依赖
cd backend
npm install

# 安装前端依赖（如果有）
cd ../frontend
npm install
```

3. 启动开发服务器
```bash
# 在 backend 目录下
npm run dev
```

4. 访问网站
打开浏览器访问 http://localhost:3000

## 使用说明

1. 在输入框中粘贴表情包链接
2. 点击获取按钮加载表情包
3. 选择需要的表情包
4. 点击下载按钮批量下载

## 技术栈

- 前端：HTML + CSS + JavaScript
- 后端：Node.js + Express
- 爬虫：Playwright
- 缓存：文件系统缓存

## 开发说明

- 前端代码在 frontend 目录
- 后端代码在 backend 目录
- 配置文件在 backend/config 目录
- 日志文件在 backend/logs 目录

## 注意事项

- 仅供学习和个人使用
- 请勿用于商业用途
- 遵守相关网站的使用规则

## 许可证

MIT
