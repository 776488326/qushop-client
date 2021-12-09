// webpack配置文件
module.exports = {
    lintOnSave : false, // 禁用eslint语法检查
    devServer : {
        proxy : {
            '/api': {
                target : 'http://39.98.123.211',
            }
        }
    }
}