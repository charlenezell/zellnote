# 基本功能与想法

## webpack

1. [X]es6转js
    1. 这里有未知的babel-core的转换es6时候不兼容ie8的问题,使用es3ifyPlugin解决那个问题
1. [X]sass转css
    1. 里面有兼容问题libsass与ruby sass
1. [X]资源md5
1. [X]html 模板语言化
    1. 此处没有现成可注入handlebar helper的plugin暂时
        1. 因为写作时候handlebars-loader只能通过文件夹注入partial和helper所以内部自己创建了一个js解析器，没有公开那个handlebars运行时的实例，所以很难使用标准的一些比如handlebars-helper和使用批量注册helper的handlebars-layout
        1. 然而发觉handlebars内置是支持partial参数传递所以也可以实现block/content/extend的layout逻辑
        1. helpers目录可以写自定义的helper
        1. partials目录可以放自定义partial
    1. 注入数据暂时考虑只能写一个插件注入运行时对象X
        1. 结果看到HtmlwebpackPlugin也是注入自己的option的那就也直接注入,然后在模板里面用with语句屏蔽掉插件的ns；然后data目录会自动merge作为hbs内可用的全局数据
1. 环境配置的抽出某种形式
1. [X]可以使用既有的mixin驱动
1. sprite拼贴
1. 会按照template的子hbs创建入口，同时注入同名的entryChunk
1. 使用commonChunkPlugin来自动抽取公共的css和js
1. vender方面需要再想想
1. 还有css内部的资源引入需要再看看
1. 图片引入的路径问题
## advansed

1. entry支持类component的css,js,template模块化
1. css支持与资源meta数据的交互和与template的模块化
1. 体验类似ng-cli
1. gulp 驱动webpack
1. 看能否移除对zellsprite的依赖找到一个生成元数据的loader之类的
1. cssModule