"use strict";
var Immutable = require("immutable");
var chai_1 = require("chai");
var map1;
map1 = Immutable.Map({ a: 1, b: 2, c: 3 });
var map2 = map1.set('b', 50);
console.log(map1.get('b'), map2.get('b'));
console.log("done4");
chai_1.expect(map1).to.equal(map2);
