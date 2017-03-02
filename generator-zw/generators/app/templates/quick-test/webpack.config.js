/*global __dirname, require, module*/

const webpack = require('webpack');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const glob = require("glob");
const env = require('yargs').argv.env; // use --env with webpack 2
let libraryName = 'bt_imageUploader';

function getFileNameWithOutExt(fn) {
  return path.basename(fn, path.extname(fn));
}
let plugins = [
    new es3ifyPlugin(),
  ].concat(glob.sync("./src/template/*.html").map(v => {
    return new HtmlwebpackPlugin({
      template: v,
      // chunks: ['polyfills',getFileNameWithOutExt(v)],
      chunks: [getFileNameWithOutExt(v)],
      filename: `${getFileNameWithOutExt(v)}.html`
    })
  })),
  outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({
    minimize: true
  }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

function fromSrcRoot(target) {
  return path.join("src", target);
}

function allEntryScript() {
  let t = {}
  glob.sync(fromSrcRoot("script") + "/*.js").forEach(v => {
    t[path.basename(v, '.js')] = path.resolve("./", v);
  });
  return t;
}
function fromBuildRoot(target) {
    return path.join(__dirname, target);
}
const config = {
  entry: [].concat(
    allEntryScript()
  ),
  devtool: 'source-map',
  output: {
    path: fromBuildRoot('build'),
    filename: '[name].js',
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
        loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"],
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10,
          name: 'style/[name].[ext]?[sha256:hash:8]',
          outputPath: ''
        },
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    alias: {
      "jquery": "empty"
    },
    modules: [path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
};

module.exports = config;
