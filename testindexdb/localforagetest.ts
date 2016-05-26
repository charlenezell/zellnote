/// <reference path="./typings/index.d.ts" />
import * as localForage from './node_modules/localforage/dist/localforage';
var lf:LocalForage=localForage;
lf.getItem("hello").then(function(arg){
    console.log(arg);
}).catch(function(e){
    console.log(e);
})
lf.setItem("hello","what's your name?").then(function(a){
    console.log(a)
}).catch(function(e){
    console.log(e);
})