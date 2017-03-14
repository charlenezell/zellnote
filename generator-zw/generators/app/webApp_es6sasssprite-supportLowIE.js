let glob = require('glob');
let path = require('path');
module.exports = {
  init: function (name, context) {
    let root = path.join(__dirname, "templates", name, "**/*");
    glob.sync(root, {
      cwd: context.sourceRoot().replace(path.sep, path.posix.sep),
      ignore: [`node_modules/**`, `typings/**`, `build/**`, `src/style/sprites/**`].map(v => path.join(__dirname, "templates", name, v)),
      dot: true
    }).forEach(v => {
      context.fs.copy(
        context.templatePath(v),
        path.join(context.destinationPath(), path.relative(path.join(context.templatePath(), name), v))
      );
    });
    let projectConfig = context.fs.readJSON(context.destinationPath("project.config.json"));
    let {
      https,
      inline
    } = context.props;
    let props = {
      https,
      inline
    };
    projectConfig = Object.assign(projectConfig, props);
    context.fs.writeJSON(context.destinationPath("project.config.json"), projectConfig);
  },
  askQuestions: function () {
    return [{
      type: 'confirm',
      name: 'https',
      message: '需要webpack-dev-server的https支持?'
    }, {
      type: 'confirm',
      name: 'inline',
      message: '内联样式和脚本？'
    }, {
      type: 'confirm',
      name: 'knowconfigpath',
      message: '以上配置可以在项目更目录找到project.config.json修改，明白？'
    }]
  }

}
