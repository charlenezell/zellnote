import $ from "./lib/jquery.js";
import "./style/common.css";
import "./style/sub2.css";
import './util/cookie.js';
console.log("sub2");
console.log($);
import(/* webpackChunkName: "a_b"*/
"./component/b.js").then(b=>{
    b.init();
})