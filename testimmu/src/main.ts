///<reference path='../node_modules/immutable/dist/immutable.d.ts'/> 
import Immutable = require('immutable');
var map1: Immutable.Map<string, number>;
map1 = Immutable.Map({a:1, b:2, c:3});
var map2 = map1.set('b', 50);

console.log(map1.get('b'),
map2.get('b'))