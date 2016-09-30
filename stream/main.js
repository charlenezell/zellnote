var through=require("through2");
var stream=through(function write(bufer,encoding,next){
    this.push("hello =>data"+bufer);
    next();
},function end(d){
    console.log("h")
    d();
})
process.stdin.pipe(stream).pipe(process.stdout);