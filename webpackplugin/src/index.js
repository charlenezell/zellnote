import $ from "./lib/jquery.js";
console.log("Index");
console.log($);

import(/* webpackChunkName: "a_a"*/
"./component/a.js").then(a=>{
    a.init();
})