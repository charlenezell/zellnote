var hbs=require("handlebars");
module.exports=function(name){
    return new hbs.SafeString(name+"'s world!")
}