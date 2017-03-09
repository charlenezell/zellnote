/*global __dirname, require, module*/

import HtmlwebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import StyleExtHtmlWebpackPlugin from 'style-ext-html-webpack-plugin';
import fs from 'fs';
// const es3ifyPlugin = require('es3ify-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const glob = require("glob");
const env = require('yargs').argv.env; // use --env with webpack 2
let libraryName = 'bt_imageUploader';
let appCommonData = {
  version: (new Date() - 0)
};
glob.sync("./src/data/*.json").map(v => {
  var json = JSON.parse(fs.readFileSync(v));
  // console.log(json);
  appCommonData = {
    ...appCommonData,
    ...json
  };
});
const projectConfig = JSON.parse(fs.readFileSync(path.join(__dirname, "project.config.json")));

function getFileNameWithOutExt(fn) {
  return path.basename(fn, path.extname(fn));
}
const extractCSS = new ExtractTextPlugin({
  // outputPath: '../style/',
  filename: '[name].css' //如若使用了StyleExtHtmlWebpackPlugin的话不能使用带hash的文件名
  // filename: 'style/[name].css?[contenthash:8]',
});
let plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: "polyfills"
      /*,
            minChunks: Infinity*/
      // (with more entries, this ensures that no other module
      //  goes into the vendor chunk)
    }),
    // new es3ifyPlugin(),
    extractCSS,
    ...glob.sync("./src/pages/*.hbs").map(v => {
      return new HtmlwebpackPlugin({
        // hash:true,//使用inline时候这个不能有
        // _moduleName:v.replace(".hbs",""),
        template: v,
        minify: {
          decodeEntities: true,
          // removeAttributeQuotes: true,
          collapseInlineTagWhitespace: true,
          preserveLineBreaks: true,
          collapseWhitespace: true,
          minifyCSS: true
          /*,
                    minifyJS: true*/
        },
        // outputPath: '../',
        xhtml: true,
        chunks: ['polyfills', getFileNameWithOutExt(v)],
        // chunks: [getFileNameWithOutExt(v)],
        // chunks: [],
        // inject:false,
        filename: `${getFileNameWithOutExt(v)}.html`,
        ...appCommonData
      })
    })
  ],
  outputFile;
const {
  sassLibPath
} = {
  sassLibPath: [path.resolve('E:/projectA/source/web/resource/marketnew/common/src/scss/common/')]
};
if (projectConfig.inline) {
  plugins.push(
    new StyleExtHtmlWebpackPlugin()
  )
  plugins.push(
    new ScriptExtHtmlWebpackPlugin({
      // defaultAttribute: 'defer',
      inline: glob.sync(fromSrcRoot() + "/*.js").map(v => path.basename(v)).concat(["polyfills.js"])
    })
  )
}
if (env === 'build') {
  plugins.push(new UglifyJsPlugin({//这里真是汗啊。。。。
    mangle: {
      // mangle options, if any
      screw_ie8: false
    },
    compress: {
      screw_ie8: false,
      //properties: false // optional: don't convert foo["bar"] to foo.bar
    },
    output: {
      screw_ie8: false
    }
  }));
  // outputFile = libraryName + '.min.js';
} else {
  // outputFile = libraryName + '.js';
}

function fromSrcRoot(target) {
  return path.join("src", target || "");
}

function allEntryScript() {
  let t = {}
  glob.sync(fromSrcRoot() + "/*.js").forEach(v => {
    // console.log(path.basename(v, '.js'),path.resolve("./", v))
    t[path.basename(v, '.js')] = path.resolve("./", v);
  });
  return t;
}

function fromBuildRoot(target) {
  return path.join(__dirname, target);
}
const config = {
  devServer: {
    contentBase: path.join(__dirname, "build"),
    https: projectConfig.https || false,
    open: true
  },
  entry: {
    ...allEntryScript()
    /*,
        "polyfills": ["core-js"]*/
  },
  devtool: env == "build" ? false : "eval-source-map",
  output: {
    path: fromBuildRoot('build'),
    // filename: 'script/[name].js'
    filename: '[name].js'
    // filename: 'script/[name].js?[hash:8]'
    // library: libraryName,
    // libraryTarget: 'umd',
    // umdNamedDefine: true,
    // publicPath: "http://mynoden.100bt.com/uploader/lib/"
  },
  module: {
    rules: [{
        test: /(\.jsx|\.js)$/,
        loader: ['es3ify-loader', 'babel-loader'],
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"],
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [{
            loader: "css-loader",
            options: {
              minimize: env == "build" ? true : false,
              sourceMap: env == "build" ? false : true
            }
          }, {
            loader: "sass-loader",
            options: {
              includePaths: sassLibPath,
              sourceMap: env == "build" ? false : true
            }
          }]
        }),
        exclude: /(node_modules|bower_components)/
      }, {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          helperDirs: [__dirname + "/src/pages/helpers", __dirname + "/node_modules/handlebars-helpers/lib"],
          partialDirs: [__dirname + "/src/pages/partials"]
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10,
          name: '[name].[ext]?[sha256:hash:8]'
        },
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    alias: {

    },
    modules: ["node_modules"],
    extensions: ['.json', '.js']
  },
  plugins: plugins
};

module.exports = function (env) {
  return config;
};
