import glob from "glob";
import path from "path";
import HtmlwebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from "extract-text-webpack-plugin";//no hot module replace 这里开发环境可以做个配置
import fs from 'fs';
import "babel-polyfill";
import {
    optimize
} from 'webpack';
let appCommonData={};

glob.sync("./src/data/*.json").map(v=>{
    var json=JSON.parse(fs.readFileSync(v));
    // console.log(json);
    appCommonData={
        ...appCommonData,
        ...json
    };
});

const {
    CommonsChunkPlugin
} = optimize;

function getFileNameWithOutExt(fn){
    return path.basename(fn,path.extname(fn));
}

const extractCSS=new ExtractTextPlugin('style/[name].css?[contenthash]',{
    // allChunks:true
});


function getEntryJSConfig() {
    var g = {}
    glob.sync("./src/sctipt/*.es6").forEach(v => {
        g[getFileNameWithOutExt(v)]=v;
    });
    return g;
}

function getHtmlEntryConfig() {
    return glob.sync("./src/template/*.hbs").map(v => {
        return new HtmlwebpackPlugin({
            template: v,
            chunks: ['polyfills',getFileNameWithOutExt(v)],
            filename: `${getFileNameWithOutExt(v)}.html`,
            ...appCommonData
        })
    })
}
const {
    sassLibPath
} = {
    sassLibPath: path.resolve('E:/projectA/source/web/resource/marketnew/common/src/scss/common/')
};

export default {
    entry: {
        ...getEntryJSConfig(),
        polyfills: ["babel-polyfill"]
    },
    module: {
        loaders: [{
                test: /\.hbs$/,
                loader: 'handlebars',
                query:{
                    helperDirs:__dirname + "/src/hbsHelper"
                }
            },
            {
                test: /\.scss$/,
                // loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]
                loader:extractCSS.extract(['css?sourceMap','sass?sourceMap'])
            }, {
                test: /\.es6$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ["transform-object-rest-spread", [
                        'transform-runtime', {
                            "helpers": false,
                            "polyfill": false,
                            "regenerator": false,
                            "moduleName": "babel-runtime"
                        }
                    ]]
                }
            }
        ]
    },
    output: {
        filename: "./script/[name].js",
        path: "./build/",
        publicPath:"http://localhost:4001/"
    },
    devtool: "source-map",
    plugins: [
        new CommonsChunkPlugin({
            name: "polyfills",
            filename: 'polyfill.bundle.js'
        }),
        ...getHtmlEntryConfig(),
        extractCSS
    ],
    sassLoader: {
        includePaths: sassLibPath
    }
}