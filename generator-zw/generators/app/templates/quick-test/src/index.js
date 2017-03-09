import indexstyle from  './style/index.scss';
import polyfill from 'es5-shim';
var div=document.createElement("div");
div.textContent="hello";
div.className="worldBtn";
document.body.appendChild(div);
let a={
    b:4
}
var c=[1,2,3];
console.log(c.map(v=>v+1))
// let g={
//     ...a
// }

// console.log(`${g.b} is here`);