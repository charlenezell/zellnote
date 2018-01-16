import $ from "./lib/jquery.js";
import "./style/common.css";
import "./style/sub.css";
import './util/cookie.js';
console.log("sub");
console.log($);
import(/* webpackChunkName: "a_b"*/
"./component/b.js").then(b=>{
    b.init();
})
import("./util/login.js").then(a=>{
    console.log("loginSuccess");
})