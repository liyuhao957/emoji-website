# 表情包下载器

一个简单易用的表情包批量下载工具，支持从发表情网站下载表情包。

## 功能特点

- 🔍 输入链接自动获取表情包
- 🖼️ 支持静态图片和 GIF 动图
- ✨ 支持批量选择和下载
- 📦 自动打包为 ZIP 文件
- 🌓 支持深色/浅色主题切换

## 技术栈

### 前端
- HTML5 + CSS3
- JavaScript (ES6+)
- JSZip - ZIP 文件处理
- FileSaver - 文件下载
- RemixIcon - 图标库

### 后端
- Node.js
- Express - Web 框架
- Axios - HTTP 客户端
- Cheerio - HTML 解析

## 安装

1. 克隆仓库
```bash
git clone https://github.com/yourusername/emoji-website.git
cd emoji-website
```

2. 安装依赖
```bash
# 安装后端依赖
cd backend
npm install

# 安装前端依赖
cd ../frontend
npm install
```

## 使用方法

1. 启动后端服务
```bash
cd backend
npm run dev
```

2. 打开浏览器访问：`http://localhost:3000`

3. 使用步骤：
   - 输入表情包链接（例如：https://www.fabiaoqing.com/bqb/detail/id/123）
   - 点击"获取"按钮
   - 选择需要的表情包
   - 点击"下载选中"按钮

## 功能说明

### 图片获取
- 支持发表情网站的表情包详情页
- 自动过滤重复图片
- 支持 JPG、PNG、GIF 格式

### 批量下载
- 支持单个/批量选择
- 全选/取消全选
- 并发下载（每批5个）
- 自动打包为 ZIP

### 用户界面
- 响应式设计
- 深色/浅色主题
- 进度提示
- 错误处理

## 注意事项

1. 性能限制
   - 单文件大小限制：50MB
   - 最大文件数量：100个
   - 下载超时：10秒

2. 使用限制
   - 请遵守目标网站的使用条款
   - 仅供个人使用
   - 注意网络流量消耗

## 开发说明

### 目录结构
```
emoji-website/
├── backend/             # 后端代码
│   ├── src/            # 源代码
│   ├── config/         # 配置文件
│   └── package.json    # 依赖配置
├── frontend/           # 前端代码
│   ├── css/           # 样式文件
│   ├── js/            # JavaScript 文件
│   └── index.html     # 主页面
└── README.md          # 说明文档
```

### 开发模式
```bash
# 后端开发模式（支持热重载）
cd backend
npm run dev

# 前端修改直接生效，无需编译
```

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 致谢

- [发表情](https://www.fabiaoqing.com/) - 表情包来源
- [JSZip](https://stuk.github.io/jszip/) - ZIP 文件处理
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/) - 文件下载
- [RemixIcon](https://remixicon.com/) - 图标库