import "./lib/jquery.js";
console.log("sub");

import(/* webpackChunkName: "a_b"*/
"./component/b.js").then(b=>{
    b.init();
})