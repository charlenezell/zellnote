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
        path.join(context.destinationPath(),path.relative(path.join(context.templatePath(),name),v))
      );
    })
  }
}
