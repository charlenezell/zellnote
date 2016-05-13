///<reference path='../typings/main.d.ts'/>

import * as Immutable from "immutable";
import {expect, assert} from "chai";

var map1: Immutable.Map<string, number>;

map1 = Immutable.Map({ a: 1, b: 2, c: 3 });

var map2 = map1;
map2.set('b', 50);

// assert(map2===map1,"isTrue")
var list1 = Immutable.List.of("hello", "hi");
var list2 = list1.push("123", "323");
var w = map2.map(a => a + 1).join(",");
// console.log(w);
var oddSquares = Immutable.Seq.of(1, 2, 3, 4, 5, 6, 7, 8)
    .filter((x) => {
        console.log(x, x % 2);
        return !!(x % 2);
    }).map((x) => {
        console.log("b");
        return x * x;
    });

oddSquares.get(1);
console.log(Immutable.Range(1, Infinity)
    .skip(30000)
    .map(n => -n)
    .take(200)
    .reduce((a,b)=>a+b,1)
    );
    
   