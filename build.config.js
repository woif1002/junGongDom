const config = {
    buildName: '/',
    cdn: {
        // 开发环境
        dev: {
            css: [],
            js: []
        },
        // 生产环境
        build: {
            css: [],
            js: []
        }
    },
    proxy: {
        '/api': {
            target: 'http://ktt-test.woyaoq.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/'
            }
        }
    }

}
module.exports = config