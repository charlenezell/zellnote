import glob from "glob";
import path from "path";
import HtmlwebpackPlugin from 'html-webpack-plugin';
import "babel-polyfill";
import {optimize} from 'webpack';
const {
    CommonsChunkPlugin
}=optimize;
function getEntryJSConfig() {
    var g = {}
    glob.sync("./src/sctipt/*.es6").forEach(v => {
        g[path.basename(v, ".es6")] = v;
    });
    return g;
}

function getHtmlEntryConfig() {
    return glob.sync("./src/template/*.hbs").map(v => {
        return new HtmlwebpackPlugin({
            template: v,
            chunks: ['babel-polyfill',path.basename(v, ".hbs")],
            filename: `${path.basename(v,".hbs")}.html`
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
        polyfills:["babel-polyfill"]
    },
    module: {
        loaders: [{
                test: /\.hbs$/,
                loader: 'handlebars'
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ["transform-object-rest-spread"]
                }
            }
        ]
    },
    output: {
        filename: "./script/[name].js",
        path: "./build/"
    },
    devtool: "source-map",
    plugins: [
        new CommonsChunkPlugin({
            name:"polyfills",
            filename:'polyfill.bundle.js'
        }),
        ...getHtmlEntryConfig()
    ],
    sassLoader: {
        includePaths: sassLibPath
    }
}