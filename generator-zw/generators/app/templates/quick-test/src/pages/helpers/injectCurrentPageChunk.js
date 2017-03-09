var path=require("path");
module.exports=function(compilation,hwp){
    // return path.posix.join("script",path.basename(hwp.options.filename,".html"),".js");
    // return JSON.stringify(hwp.options,null,'\t');
    // return typeof obj;
    // return JSON.stringify(obj);
    // return typeof compilation;
    // return JSON.stringify(hwp,null,'\t')
    // return JSON.stringify(compilation.assets,null,'\t');
    // return path.posix.join("script",path.basename(hwp.options.filename,".html")+".js");
    // return JSON.stringify(compilation.assets[path.posix.join("script",path.basename(hwp.options.filename,".html"),".js")],null,'\t');
    // return JSON.stringify(compilation.assets[path.posix.join("script",path.basename(hwp.options.filename,".html")+".js")],null,'\t');
    return compilation.assets[path.posix.join("script",path.basename(hwp.options.filename,".html")+".js")].source();

}