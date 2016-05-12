///<reference path='../typings/main.d.ts'/>

import * as Immutable from "immutable";
import {expect,assert} from "chai";

var map1: Immutable.Map<string, number>;

map1 = Immutable.Map({ a: 1, b: 2, c: 3 });

var map2 = map1;
map2.set('b', 50);

// assert(map2===map1,"isTrue")
Immutable.List.of("hello","hi");