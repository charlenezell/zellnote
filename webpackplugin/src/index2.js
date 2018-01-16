import $ from "./lib/jquery.js";
import $ from "./lib/react.js";
import "./style/common.css";
import "./style/index2.css";
import './util/cookie.js';
console.log("Index2");
console.log($);
console.log(122223);
import(/* webpackChunkName: "a_a"*/
"./component/a.js").then(a=>{
    a.init();
})
import("./util/login.js").then(a=>{
    console.log("loginSuccess");
})