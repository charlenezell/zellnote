///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
///<reference path='../typings/main/ambient/chai/index.d.ts'/>  
import * as Immutable from "immutable" ;
import {expect} from "chai";
var map1: Immutable.Map<string, number>;
map1 = Immutable.Map({a:1, b:2, c:3});
var map2 = map1.set('b', 50);

console.log(map1.get('b'),
map2.get('b'))
console.log("done4")
expect(map1).to.equal(map2);
