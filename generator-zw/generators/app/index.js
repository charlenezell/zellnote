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
      'Welcome to the super ' + chalk.red('generator-zw') + ' generator!'
    ));

    var prompts = [{
      type: 'list',
      name: 'template',
      message: '选择一个模板',
      choices: [
        'jslib',
        'widget',
        'quick-test'
      ],
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    console.log(this.props);
    // this.fs.copy(
    //   this.templatePath('dummyfile.txt'),
    //   this.destinationPath('dummyfile.txt')
    // );
    let {
      template
    } = this.props;
    if (template === 'quick-test') {
      glob.sync(path.join(template, '**/*'), {
        cwd: this.sourceRoot()
      }).forEach(v => {
        this.log(v, this.templatePath(v), this.destinationPath(v));
        this.fs.copy(
          this.templatePath(v),
          this.destinationPath(v.replace(new RegExp('^' + template + "/",'g'), ''))
        );
      })
    }
  },

  install: function () {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    })
  }
});
