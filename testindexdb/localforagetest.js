(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './node_modules/localforage/dist/localforage'], factory);
    }
})(function (require, exports) {
    "use strict";
    /// <reference path="./typings/index.d.ts" />
    var localForage = require('./node_modules/localforage/dist/localforage');
    var lf = localForage;
    lf.getItem("hello").then(function (arg) {
        console.log(arg);
    }).catch(function (e) {
        console.log(e);
    });
    lf.setItem("hello", "what's your name?").then(function (a) {
        console.log(a);
    }).catch(function (e) {
        console.log(e);
    });
});
