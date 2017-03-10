var gulp = require("gulp");
var zellsprite = require("zellsprite");
zellsprite.default(gulp, {
  src: "./src/sprites",
  dest: "./src/style/sprites",
  templateFile: "./css.hb",
  destBaseOn: "./src/style/"
});
