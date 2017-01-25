var hbs=require("handlebars");
var fs=require("fs");
var path=require("path");
var hbT=fs.readFileSync("./index.hbs").toString();
var glob=require("glob");
var hbl=require("handlebars-layout");
var helpers=glob.sync("./helpers/*").map(v=>{
    var a={};
    a[path.basename(v,".js")]=require(v)
    return a;
}).reduce((a,b)=>{
    return Object.assign({},a,b);
},{});

var partials=glob.sync("./partials/*").map(v=>{
    var a={};
    a[path.basename(v,".hbs")]=fs.readFileSync(v).toString()
    return a;
}).reduce((a,b)=>{
    return Object.assign({},a,b);
},{});
// console.log(partials);
// console.log(helpers);
hbs.registerHelper(helpers);
hbs.registerHelper(hbl(hbs));
hbs.registerPartial(partials);
var template = hbs.compile(hbT);
var rst=template();
fs.writeFileSync('./index.html',rst,{
    encoding:"utf8"
})