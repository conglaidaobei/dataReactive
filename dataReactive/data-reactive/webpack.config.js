const path = require('path');

module.exports = {
    mode: 'development',
    //入口
    entry: './src/index.js',
    //打包到什么文件
    output: {
        filename: 'bundle.js',
        //虚拟打包的路径，bundle.js文件没有真正的生成
        publicPath: "xuni"
    },
    //配置 webpack-dev-server
    devServer: {
        //静态文件根目录
        contentBase: path.join(__dirname,"www"),
        //不压缩
        compress: false,
        //端口号
        port: 8080,
        
    }
};
  