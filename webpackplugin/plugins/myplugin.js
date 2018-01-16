var fs = require("fs");
var path = require("path");
function myplugin(option) {

}
function showassets(event, asset) {
    // fs.writeFileSync(path.resolve(__dirname,'op.json'),`${event}==>${JSON.stringify(asset)}`,{encoding:'utf8'});
}
myplugin.prototype.apply = function (compiler) {
    compiler.plugin("emit", function (compilation, callback) {
        // showassets("emit",compilation.assets)
        // Do something async...
        compilation.assets['asset.json'] = {
            source: function () {
                return g;
            },
            size: function () {
                return g.length;
            }
        };
        let g=JSON.stringify(compilation.assets,null,'\t')
        callback();

    });
    compiler.plugin('compilation', function (compilation) {
        // console.log("######compilation");
        // showassets("compilation",compilation.assets)//空
        compilation.plugin("optimize", function () {
            // console.log("######Assets are being optimized.");
        })
    })
}
module.exports = myplugin;