module.exports = {
    // 链接测试用例
    urlCases: [
        {
            type: '详情页',
            url: '/bqb/detail/id/123',
            expected: true
        },
        {
            type: '列表页',
            url: '/biaoqing',
            expected: true
        },
        {
            type: '搜索页',
            url: '/search/bqb/keyword/test/type/bq/page/1',
            expected: true
        },
        {
            type: '无效链接',
            url: 'invalid-url',
            expected: false
        }
    ],

    // 图片测试用例
    imageCases: [
        {
            type: 'JPG图片',
            url: 'https://www.fabiaoqing.com/biaoqing/detail/id/123456.jpg',
            expected: {
                format: 'jpg',
                shouldLoad: true
            }
        },
        {
            type: 'GIF图片',
            url: 'https://www.fabiaoqing.com/biaoqing/detail/id/123456.gif',
            expected: {
                format: 'gif',
                shouldLoad: true
            }
        }
    ]
}; 