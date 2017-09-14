协程（coroutine）有多种表达方式的定义，对于没接触过的人，都不好理解，所以暂且只能说协程是某些编程语言（c#, lua等）提供的一种语法，利用这种语言特征，可以写出优雅的异步回调代码。

异步回调在flash前端十分常见，例如下载文件：

load(file, onLoadCompleted);

load是个异步操作，调用了load，不阻塞，后续代码继续执行。load里的操作完成之后回调onLoadCompleted。

function onLoadCompleted(....) { ... }

如果要依次下载A、B和C三个文件，代码大概就是这样：

load(fileA, onLoadAOk);

onLoadAOk() {
  load(fileB, onLoadBOk);
}

onLoadBOk() {
  load(fileC, onLoadCOk);
}

onLoadCOk() {}

这样的代码，是不优雅的，逻辑离散在多个函数中，可读性不好（对于习惯了这种异步回调的人来说，也是不难读懂的）。

如果用支持协程的语言，可以写成这样（伪代码，语法不严谨）：

load(fileA, onLoadAOk);
yield;
load(fileB, onLoadBOk);
yield;
load(fileC, onLoadCOk);

onLoadAOk() {
  ...
  resume;
}

onLoadBOk() {
  ...
  resume;
}

onLoadCOk() {}

以上代码中出现了两个重要的关键字yield和resume：

yield：挂起当前执行的代码，即执行停止在这里

resume：从yield的地方继续执行

明白了这两个关键字的作用，要仔细再推敲一下以上代码。

抽取重复代码，成了这样：

loadAsync(fileA, onLoadAOk);
loadAsync(fileB, onLoadBOk);
load(fileC, onLoadCOk);

loadAsync(file, callBack) {
  load(file, function() {callback; resume;});
  yield;
}

依次load文件A、B和C的逻辑在这段代码中就很明显了。

C#中也有yield，含义类似；迭代器中的MoveNext相当于resume。

容易让人迷惑的是，yield / resume跟普通函数调用代码跳转是不同的：

普通函数调用：A调用B，B执行完了，继续回到A函数，从调用B的下一行代码继续执行。B的函数调用栈是紧跟在A的上面的。

在以上异步调用中，yield所在的函数和resume所在的函数不存在普通的调用关系，yield所在的函数发起异步调用，在异步调用的回调函数中resume，实现了从回调函数中跳转到发起异步调用的函数，这两个函数是不存在普通调用关系的。至于这两个函数的调用栈的关系，取决于异步回调是如何实现的？如何实现异步调用，这是个很有意思，值得思考的问题。

//callback
doA(function() {
    doB(function() {
        doC();
    });
});

//coroutine
function doC(fn) {
    fn(function(){
        resume;
    });
    yield;
}
doC(A)()
doC(B)()
doC(C)()

//Promised
function mkPromise(fn) {
    var d = $.Deferred();
    fn(function() {
        d.resolve();
    });
    return d;
}
mkPromise(A).then(function() {
                return mkPromise(C)
            })
            .then(function() {
                return mkPromise(B)
            }).then(function() {
                console.log("finished")
            });

//opt Promised
var OPromise = (function() {
    function OPromise(fn,ctx) {
        this.d = $.Deferred();
        var that=this;
        if(ctx){
            ctx.d.done(function(){
                fn(function(){
                    that.d.resolve();
                });
            });
        }else{
            fn(function(){
                that.d.resolve();
            });
        }
    }
    OPromise.prototype.pipe=function(fn){
        return new OPromise(fn,this);
    }
    return OPromise;
})();


function $p(fn){
    return new OPromise(fn);
}

$p(A).pipe(B).pipe(C).pipe(function(){
    console.log("finished");
});


function A(fn) {
    setTimeout(function() {
        console.log("A done");
        fn()
    }, 1000)
}
function B(fn) {
    setTimeout(function() {
        console.log("B done");
        fn()
    }, 200)
}
function C(fn) {
    setTimeout(function() {
        console.log("C done");
        fn()
    }, 300)
}
