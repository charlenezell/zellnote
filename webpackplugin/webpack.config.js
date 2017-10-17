const path = require("path");
const myplugin= require('./plugins/myplugin');
const webpack = require('webpack');
module.exports ={
    entry: {
        index: [path.resolve("src/index.js")],
        sub: [path.resolve("src/sub.js")],
        vendor:[path.resolve("src/lib/jquery.js")]
    },
    output: {
        path:  path.resolve("./build"),
        filename: '[name].js',
        chunkFilename:'[name].bundle.js',
        publicPath:"http://127.0.0.1:5500/build/"
    },
    plugins:[
        new myplugin({
            myOption:123
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names:["vendor"],
            minChunks:Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names:[ 'manifest'],
            minChunks:Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            children:true,
            minChunks:2,
            async:"a_common"
        })
    ]
}