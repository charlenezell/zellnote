/// <reference path="../../typings/index.d.ts" />
'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var glob = require("glob");
var path = require("path");
module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      '欢迎使用 ' + chalk.red('zw') + 'project generator!'
    ));

    var prompts = [{
      type: 'list',
      name: 'template',
      message: '选择一个模板',
      choices: glob.sync(__dirname+"/templates/*").map(v=>path.basename(v))
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    let {
      template
    } = this.props;
    require(path.resolve(__dirname,template)).init(template,this);
  },

  install: function () {
    // this.installDependencies({
    //   npm: true,
    //   bower: false,
    //   yarn: false
    // })
  }
});
