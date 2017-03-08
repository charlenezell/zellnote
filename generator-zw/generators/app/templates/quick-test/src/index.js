import indexstyle from  './style/index.scss';
var div=document.createElement("div");
div.textContent="hello";
div.className="worldBtn";
document.body.appendChild(div);
let a={
    b:2
}

let g={
    ...a
}

console.log(`${g.b} is here`);