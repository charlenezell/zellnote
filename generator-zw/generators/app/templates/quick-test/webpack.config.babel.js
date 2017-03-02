/*global __dirname, require, module*/

import HtmlwebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import fs from 'fs';
const es3ifyPlugin = require('es3ify-webpack-plugin');
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
  filename: 'style/[name].css?[contenthash]',
});
let plugins = [
    new es3ifyPlugin(),
    extractCSS,
    ...glob.sync("./src/pages/*.hbs").map(v => {
      return new HtmlwebpackPlugin({
        template: v,
        // chunks: ['polyfills',getFileNameWithOutExt(v)],
        chunks: [getFileNameWithOutExt(v)],
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
if (env === 'build') {
  plugins.push(new UglifyJsPlugin({
    minimize: true
  }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

function fromSrcRoot(target) {
  return path.join("src", target || "");
}

function allEntryScript() {
  let t = {}
  glob.sync(fromSrcRoot() + "/*.js").forEach(v => {
    t[path.basename(v, '.js')] = path.resolve("./", v);
  });
  console.log(t);
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
  },
  devtool: env=="build"?false:"eval-source-map",
  output: {
    path: fromBuildRoot('build'),
    filename: 'script/[name].js',
    // library: libraryName,
    // libraryTarget: 'umd',
    // umdNamedDefine: true,
    // publicPath: "http://mynoden.100bt.com/uploader/lib/"
  },
  module: {
    rules: [{
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
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
          fallback:'style-loader',
          use: [{
            loader: "css-loader",
            options:{
              minimize:env=="build"?true:false,
              sourceMap:env=="build"?false:true
            }
          }, {
            loader: "sass-loader",
            options: {
              includePaths: sassLibPath,
              sourceMap:env=="build"?false:true
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
          name: 'img/[name].[ext]?[sha256:hash:8]',
          outputPath: 'style/'
        },
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    alias: {

    },
    // modules: [path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
};

module.exports = function (env) {
  return config;
};
