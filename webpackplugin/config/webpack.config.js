const path = require("path");
// const myplugin = require('../plugins/myplugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');
// const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
console.log("process.env.NODE_ENV",process.env.NODE_ENV);
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// const AutoDllPlugin = require('autodll-webpack-plugin');
let entrys = {
    index: ["./src/index.js"],
    index2: ["./src/index2.js"],
    sub: ["./src/sub.js"],
    sub2: ["./src/sub2.js"]
};
module.exports = {
    cache: false,
    entry: entrys,
    devtool: '#source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader'
                            }
                        ]
                    }
                )
            }, {
                test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2)$/,
                loader: 'file-loader'
            }
        ]
    },
    output: {
        path: path.resolve("./build"),
        filename: 'script/[name].[chunkhash].js',
        // filename: '[name].js',
        chunkFilename: 'script/[name].[chunkhash].bundle.js',
        // chunkFilename: '[name].bundle.js',
        publicPath: "http://127.0.0.1:5500/build/"
    },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: require('../build/dll/reactVendor-manifest.json'), // 指定manifest.json
            name: "reactVendor",
            context: __dirname
        }),
        new webpack.DllReferencePlugin({
            manifest: require('../build/dll/jqueryVendor-manifest.json'), // 指定manifest.json
            name: "jqueryVendor",
            context: __dirname
        }),
        new ExtractTextPlugin({
            filename: "style/[name].[chunkhash].css",
            // filename: "[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
            allChunks: true
        }),
        // new InlineChunkManifestHtmlWebpackPlugin(),
        // new ChunkManifestPlugin({
        //     filename: 'manifest.json',
        //     manifestVariable: 'webpackManifest',
        //     inlineManifest: true
        // }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [
                { path: 'dll/', glob: '*.js', globPath: './build/dll/' }
                // path.resolve(__dirname, './build/dll/*.js')
            ], append: false
        }),
        // new AddAssetHtmlPlugin(
        //     { filepath: }
        // ),
        // new myplugin({
        //     myOption: 123
        // }),
        // new AutoDllPlugin({
        //     inject: true,
        //     filename: '[name].[hash].js',
        //     debug:true,
        //     // path:"./dll",
        //     entry: {
        //         reactVendor:["./src/lib/react.js"],
        //         jqueryVendor:["./src/lib/jquery.js"]
        //     }
        // })
        new webpack.optimize.CommonsChunkPlugin({
            names: ["common", "manifest"]
        })/* ,
        new webpack.optimize.CommonsChunkPlugin({
            async:true,
            chunks:["a_a","a_b"],
            minChunks:2
        }) */
        /* new webpack.optimize.CommonsChunkPlugin({
            names: ["reactVendor"],
            chunks:["index","index1"],
            minChunks:Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names:["common"],
            children:true,
            deepChildren:true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names:["vendor","manifest"],
            minChunks:Infinity
        }) */
    ].concat(Object.keys(entrys).map(key => {
        return new HtmlWebpackPlugin({
            inject: false,
            chunks: [key, 'common', 'manifest'],
            filename: `__forInclude__${key}.jsp`,
            template: "toJSPIncludesPage.ejs",
            chunksSortMode: 'dependency'
        })
    })).concat(Object.keys(entrys).map(key => {
        return new HtmlWebpackPlugin({
            chunks: [key, 'common', 'manifest'],
            filename: `${key}.html`,
            chunksSortMode: 'dependency'
        })
    }))
}