"use strict";
var Immutable = require("immutable");
var map1;
map1 = Immutable.Map({ a: 1, b: 2, c: 3 });
var map2 = map1;
map2.set('b', 50);
var list1 = Immutable.List.of("hello", "hi");
var list2 = list1.push("123", "323");
var w = map2.map(function (a) { return a + 1; }).join(",");
var oddSquares = Immutable.Seq.of(1, 2, 3, 4, 5, 6, 7, 8)
    .filter(function (x) {
    console.log(x, x % 2);
    return !!(x % 2);
}).map(function (x) {
    console.log("b");
    return x * x;
});
oddSquares.get(1);
console.log(Immutable.Range(1, Infinity)
    .skip(30000)
    .map(function (n) { return -n; })
    .take(200)
    .reduce(function (a, b) { return a + b; }, 1));
