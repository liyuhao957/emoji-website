// DOM 元素
const themeSwitch = document.querySelector('.theme-switch');
const urlInput = document.getElementById('urlInput');
const fetchBtn = document.getElementById('fetchBtn');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const imageGrid = document.getElementById('imageGrid');
const selectedCount = document.getElementById('selectedCount');
const downloadBtn = document.getElementById('downloadSelected');

// 状态管理
let selectedImages = new Set();

// 主题切换
themeSwitch.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeSwitch.innerHTML = `<i class="ri-${isDark ? 'moon' : 'sun'}-line"></i>`;
});

// 模拟数据（后面会替换为真实API）
const mockImages = [
    'https://picsum.photos/200',
    'https://picsum.photos/201',
    'https://picsum.photos/202',
    'https://picsum.photos/203',
    'https://picsum.photos/204',
    'https://picsum.photos/205',
];

// 显示加载状态
function showLoading(show = true) {
    loadingEl.style.display = show ? 'block' : 'none';
    errorEl.style.display = 'none';
}

// 显示错误信息
function showError(message) {
    errorEl.querySelector('p').textContent = message;
    errorEl.style.display = 'flex';
    loadingEl.style.display = 'none';
}

// 创建图片元素
function createImageElement(src) {
    console.log('创建图片元素:', src);
    const div = document.createElement('div');
    div.className = 'image-item';
    
    const img = document.createElement('img');
    img.loading = 'lazy';
    
    // 添加加载状态
    div.classList.add('loading');
    
    // 重试计数
    let retryCount = 0;
    const maxRetries = 3;

    // 加载图片
    function loadImage() {
        // 使用完整的API地址
        img.src = `http://localhost:3000/api/image?url=${encodeURIComponent(src)}`;
    }
    
    // 图片加载完成
    img.onload = () => {
        console.log('图片加载成功:', src);
        div.classList.remove('loading');
    };
    
    // 图片加载失败
    img.onerror = () => {
        console.error('图片加载失败:', src);
        retryCount++;
        
        if (retryCount <= maxRetries) {
            console.log(`重试加载图片(${retryCount}/${maxRetries}):`, src);
            setTimeout(loadImage, 1000 * retryCount);
            return;
        }

        div.classList.remove('loading');
        div.classList.add('error');
        img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZjAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxsaW5lIHgxPSIxNSIgeTE9IjkiIHgyPSI5IiB5Mj0iMTUiLz48bGluZSB4MT0iOSIgeTE9IjkiIHgyPSIxNSIgeTI9IjE1Ii8+PC9zdmc+';
        img.onerror = null;
        img.classList.add('error');
    };
    
    div.appendChild(img);
    loadImage();  // 开始加载图片
    
    // 点击选择/取消选择
    div.addEventListener('click', () => {
        div.classList.toggle('selected');
        if (div.classList.contains('selected')) {
            selectedImages.add(src);
        } else {
            selectedImages.delete(src);
        }
        updateSelectedCount();
    });
    
    return div;
}

// 更新选中数量
function updateSelectedCount() {
    const count = selectedImages.size;
    selectedCount.textContent = count;
    downloadBtn.disabled = count === 0;
}

// 获取表情包
async function fetchEmojis(url) {
    console.log('开始获取表情包:', url);
    showLoading();
    imageGrid.innerHTML = '';
    selectedImages.clear();
    updateSelectedCount();
    
    try {
        const response = await window.api.getEmojis(url);
        console.log('获取到表情包数据:', response);
        response.data.images.forEach(imgUrl => {
            console.log('创建图片元素:', imgUrl);
            imageGrid.appendChild(createImageElement(imgUrl));
        });
        
        showLoading(false);
        console.log('表情包加载完成');
    } catch (error) {
        console.error('获取表情包失败:', error);
        showError('获取表情包失败，请稍后重试');
    }
}

// 事件监听
fetchBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (!url) {
        showError('请输入表情包链接');
        return;
    }
    fetchEmojis(url);
});

// 显示提示消息
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="ri-${type === 'success' ? 'checkbox-circle' : 'error-warning'}-line"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    // 3秒后移除
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 下载选中的表情包
downloadBtn.addEventListener('click', async () => {
    const totalCount = selectedImages.size;
    let successCount = 0;

    showLoading(true);
    loadingEl.querySelector('p').textContent = `正在下载表情包 (0/${totalCount})...`;

    try {
        for (const url of selectedImages) {
            try {
                await window.api.downloadEmoji(url);
                successCount++;
                loadingEl.querySelector('p').textContent = 
                    `正在下载表情包 (${successCount}/${totalCount})...`;
            } catch (error) {
                console.error('下载失败:', url, error);
            }
        }
        showLoading(false);
        if (successCount === totalCount) {
            showToast('下载完成！');
        } else {
            showToast(`下载完成！成功: ${successCount}, 失败: ${totalCount - successCount}`, 'error');
        }
    } catch (error) {
        showError('下载失败，请稍后重试');
        console.error('Error:', error);
    }
});

// 初始化深色模式
document.body.setAttribute('data-theme', 'dark'); 