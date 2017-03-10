import HtmlwebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import StyleExtHtmlWebpackPlugin from 'style-ext-html-webpack-plugin';
import webpack from 'webpack';
import HtmlWebpackIncludeAssetsPlugin from 'html-webpack-include-assets-plugin';
let {
  optimize: {
    UglifyJsPlugin
  }
} = webpack;

import fs from 'fs';
import path from 'path';
import glob from 'glob';
import yargs from 'yargs';
// const webpack = require('webpack');
// const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
// const path = require('path');
// const glob = require("glob");

function getFileNameWithOutExt(fn) {
  return path.basename(fn, path.extname(fn));
}

function fromSrcRoot(target) {
  return path.join("src", target || "");
}
let allEntryArray = glob.sync(fromSrcRoot() + "/*.js");

function allEntryScript() {
  let t = {}
  allEntryArray.forEach(v => {
    // console.log(path.basename(v, '.js'),path.resolve("./", v))
    t[path.basename(v, '.js')] = path.resolve("./", v);
  });
  return t;
}

function fromBuildRoot(target) {
  return path.join(__dirname, target);
}

const env = yargs.argv.env;
const isBuildEnv = env === "build" ? true : false;
let appCommonData = {
  version: (new Date() - 0)
};

glob.sync("./src/data/*.json").map(v => {
  var json = JSON.parse(fs.readFileSync(v));
  // 读取data目录的各种json并合为数据源这样就支持复杂数据源的分拆
  appCommonData = {
    ...appCommonData,
    ...json
  };
});

//读入项目配置项
const projectConfig = JSON.parse(fs.readFileSync(path.join(__dirname, "project.config.json")));

let extractCSS = new ExtractTextPlugin({
  // outputPath: '../style/',
  filename: '[name].css' //如若使用了StyleExtHtmlWebpackPlugin的话不能使用带hash的文件名
  // filename: 'style/[name].css?[contenthash:8]',
});


// 插件配置
let plugins = [
  new HtmlWebpackIncludeAssetsPlugin({
    assets: ["http://dc.100bt.com/js/dc.js","http://www.100bt.com/resource/js/lib/bdStatistic.js"],
    append: true/*,
    hash:true*/
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: "common"
  }),
  extractCSS,
  ...glob.sync("./src/pages/*.hbs").map(v => {
    var config = {
      hash: projectConfig.inline ? false : true, //使用inline时候这个不能有
      // _moduleName:v.replace(".hbs",""),
      template: v,
      // outputPath: '../',
      xhtml: true,
      chunks: ['common', getFileNameWithOutExt(v)],
      // chunks: [getFileNameWithOutExt(v)],
      // chunks: [],
      // inject:false,
      filename: `${getFileNameWithOutExt(v)}.html`,
      ...appCommonData
    };

    if (isBuildEnv) {
      Object.assign(config, {
        minify: {
          // decodeEntities: true,
          // removeAttributeQuotes: true,
          collapseInlineTagWhitespace: true,
          preserveLineBreaks: true,
          collapseWhitespace: true,
          minifyCSS: true
        }
      })
    }

    return new HtmlwebpackPlugin(config)
  })
];


if (projectConfig.inline) {
  plugins.push(
    new StyleExtHtmlWebpackPlugin()
  )
  plugins.push(
    new ScriptExtHtmlWebpackPlugin({
      // defaultAttribute: 'defer',
      inline: allEntryArray.map(v => path.basename(v)).concat(["common.js"])
    })
  )
}


if (isBuildEnv) {
  plugins.push(new UglifyJsPlugin({ //这里真是汗啊。。。。
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
  devtool: isBuildEnv ? false : "eval-source-map",
  output: {
    path: fromBuildRoot('build'),
    // filename: 'script/[name].js'
    filename: '[name].js'
    // filename: 'script/[name].js?[hash:8]'
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
              minimize: isBuildEnv ? true : false,
              sourceMap: isBuildEnv ? false : true
            }
          }, {
            loader: "sass-loader",
            options: {
              includePaths: [path.resolve(projectConfig.sassLibPath)],
              sourceMap: isBuildEnv ? false : true
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
