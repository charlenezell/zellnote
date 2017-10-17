# write a webpack plugin

<!-- TOC -->

- [write a webpack plugin](#write-a-webpack-plugin)
    - [basic stracture](#basic-stracture)
    - [concept](#concept)
    - [plugin type](#plugin-type)
    - [Tapable](#tapable)

<!-- /TOC -->

## basic stracture
```javascript
function myplugin(){

}

myplugin.prototype.apply=function(compiler){
    compiler.plugin('hook',function(compilation,callback){
        console.log("example");
        callback();
    })
}
```

## concept

1. compiler
    > The compiler object represents the fully **configured** webpack environment. This object is _**built once upon starting webpack**_, and is configured with all operational settings including options, loaders, and plugins. When applying a plugin to the webpack environment, the plugin will receive a reference to this compiler. Use the compiler to **access the main webpack environment**.

1. compilation
    > A compilation object represents a single build of **versioned assets**. While running webpack development middleware, a new compilation will be created _**each time a file change is detected**_, thus generating a new set of compiled assets. A compilation surfaces information about the present state of module resources, compiled assets, changed files, and watched dependencies. The compilation also provides many **callback points** at which a plugin may choose to perform custom actions.


>_**主要流程是找注入点注入代码，部分async代码需调用callback**_

## plugin type

1. synchronous
    >This means that each of the plugin callbacks will be invoked one after the other with the specific args. This is the simplest format for a plugin. Many useful events like "compile", "this-compilation" expect plugins to have synchronous execution.

1. waterfall
    >Here each of the plugins are called one after the other with the args from the return value of the previous plugin. The plugin must take into consider the order of its execution. It must accept arguments from the previous plugin that was executed. The value for the first plugin is init. This pattern is used in the Tapable instances which are related to the webpack templates like ModuleTemplate, ChunkTemplate etc.

1. asynchronous
    >The plugin handler functions are called with all args and a callback function with the signature (err?: Error) -> void. The handler functions are called in order of registration.callback is called after all the handlers are called. This is also a commonly used pattern for events like "emit", "run"

1. async waterfall
    >The plugin handler functions are called with the current value and a callback function with the signature (err: Error, nextValue: any) -> void. When called nextValue is the current value for the next handler. The current value for the first handler is init. After all handlers are applied, callback is called with the last value. If any handler passes a value for err, the callback is called with this error and no more handlers are called. This plugin pattern is expected for events like "before-resolve" and "after-resolve".

1. async series
    >It is the same as asynchronous but if any of the plugins registered fails, then no more plugins are called.

1. parallel
    >没有文档

## Tapable

一个事件发射器的升级版支持上述各种同步异步流程控制

