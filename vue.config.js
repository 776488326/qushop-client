module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            "/client":{
                target: "http://localhost:3000",
            },
        }
    }
}