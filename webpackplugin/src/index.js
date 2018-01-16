import $ from "./lib/jquery.js";
import $ from "./lib/react.js";
import "./style/common.css";
import "./style/index.css";
import './util/cookie.js';
console.log("Index");
console.log($);
console.log(122223323);
import(/* webpackChunkName: "a_a"*/
"./component/a.js").then(a=>{
    a.init();
})
import("./util/login.js").then(a=>{
    console.log("loginSuccess");
})