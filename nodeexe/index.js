/// <reference path="./typings/index.d.ts" />
// var open = require('open');
// open('http://aola.100bt.com');
var ws = require('windows-shortcuts');
ws.create("%USERPROFILE%/Desktop/aola.lnk", {
    target:"http://aola.100bt.com/",
    icon:"http://aola.100bt.com/favicon.ico",
    runStyle:ws.MAX,
    desc:"open aola offical website"
});