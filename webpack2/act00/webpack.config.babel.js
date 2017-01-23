const path = require("path");
const glob = require("glob");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

function fromSrcRoot(target) {
    return path.join("src", target);
}

function fromBuildRoot(target) {
    return path.join(__dirname, target);
}

function allEntryScript() {
    let t = {}
    glob.sync(fromSrcRoot("script") + "/*.js").forEach(v => {
        t[path.basename(v,'.js')] = path.resolve("./",v);
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
                test: /\.css$/,
                exclude: /node_modules/,
                // loader: ExtractTextPlugin.extract({
                //     loader: 'css-loader?sourceMap'
                // })
            }]
        },
        // devtool:'source-map',
        plugins: [
            // new ExtractTextPlugin({ filename: '[filename].css', disable: false, allChunks: true })
        ]
    }
}