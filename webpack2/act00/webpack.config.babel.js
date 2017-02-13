const path = require("path");
const glob = require("glob");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
import HtmlwebpackPlugin from 'html-webpack-plugin';

function getFileNameWithOutExt(fn) {
    return path.basename(fn, path.extname(fn));
}

function getHtmlEntryConfig() {
    return glob.sync("./src/template/*.html").map(v => {
        return new HtmlwebpackPlugin({
            template: v,
            // chunks: ['polyfills',getFileNameWithOutExt(v)],
            chunks: [getFileNameWithOutExt(v)],
            filename: `${getFileNameWithOutExt(v)}.html`
        })
    })
}

function fromSrcRoot(target) {
    return path.join("src", target);
}

function fromBuildRoot(target) {
    return path.join(__dirname, target);
}

function allEntryScript() {
    let t = {}
    glob.sync(fromSrcRoot("script") + "/*.js").forEach(v => {
        t[path.basename(v, '.js')] = path.resolve("./", v);
    });
    return t;
}

module.exports = function (env) {
    return {
        entry: {
            ...allEntryScript()
        },
        output: {
            filename: '[name].js',
            path: fromBuildRoot('build')
        },
        module: {
            rules: [{
                test: /\.es6$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }]
        },
        // devtool:'source-map',
        plugins: [
            ...getHtmlEntryConfig()
            // new ExtractTextPlugin({ filename: '[filename].css', disable: false, allChunks: true })
        ]
    }
}