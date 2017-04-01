/// <reference path="../typings/index.d.ts" />
let Q = require("Q");
let co = require("co");
let toRun = [{
    name: "basic",
    fn() {
        function* a() {
            console.log("b1")
            yield 1;
            console.log("b2")
            yield 2;
            console.log("b3")
            yield 3;
            console.log("b4")
            yield 4;
            console.log("bend ")
        }
        let g = a();
        // console.log(g)

        let end = false;
        let v = "";
        let c = 0;
        while (!end) {
            v = g.next();
            end = v.done;
            console.log(v);
            console.log(v.value);
        }
    },
}, {
    name: "in and out",
    fn() {
        function* a(x) {
            //i o 互相穿插修改一个对象的样子
            let b = yield x + 1;
            let c = yield b + 1;
        }
        let rst;
        let g = a(0);
        console.log(rst = g.next());
        console.log(rst = g.next(rst.value + 1));
        console.log(rst = g.next(rst.value + 1));
    }
}, {
    name: "for of",
    fn() {
        function* a(x) {
            yield 1;
            yield 2;
            yield 3;
            yield 4;
            yield 5;
            return 6;
        }

        function* b(x) {
            yield 1;
            yield 2;
            return 6;
            yield 3;
            yield 4;
            yield 5;
        }
        for (let b of a()) {
            console.log(b)
        }
        console.log("..........")
        for (let c of b()) {
            console.log(c)
        }
    }
}, {
    name: "error Handling",
    fn() {
        function* a(x) {
            console.log(1);
            yield 1;
            console.log(2);
            try {
                yield 2;
            } catch (e) {
                if (e == "simple") {
                    console.log("catchThrow in generator", e);
                } else {
                    throw new Error("tohard generator cant deal with it");
                }
            }
            console.log(3);
            try {
                yield 3;
            } catch (e) {
                if (e == "simple") {
                    console.log("catchThrow in generator", e);
                } else {
                    throw new Error("tohard generator cant deal with it");
                }
            }
            console.log(4);
            yield 4;
            console.log(5);
            yield 5;
            console.log(6);
            return 6;


        }
        console.log("normalRun");
        for (let c of a()) {}
        console.log("errorRun");
        let b = a();
        b.next();
        b.next(); //这里像是输入一个标准空的流
        try {
            b.throw("simple"); //这里更像是输入一个错误流
        } catch (e) {
            console.log("catch error myself", e);
        }
        b.next();
        try {
            b.throw("notSimple"); //这里更像是输入一个错误流
        } catch (e) {
            console.log("catch error myself", e);
        }

    }
}, {
    name: "next and for the rest",
    fn() {
        function* a(x) {
            console.log("1");
            yield 1;
            console.log("2");
            yield 2;
            console.log("3");
            yield 3;
            console.log("4");
            yield 4;
        }
        let b = a();
        b.next();
        b.next();
        for (let c of b) {

        }
    }
}, {
    name: "next and for the rest with error",
    fn() {
        function* a(x) {
            console.log("1");
            try {
                yield 1;
            } catch (e) {
                console.log("catched");
            }
            console.log("2");
            yield 2;
            console.log("3");
            yield 3;
            console.log("4");
            yield 4;
        }
        let b = a();
        b.next();
        b.throw('');
        try {
            b.throw('');
        } catch (e) {
            console.log("catchoutside");
        } finally { //这里似乎是外层接到的错误是不能finally掉的。。。。

            for (let c of b) {

            }
        }

    }
}, {
    name: "yield and yield and... return a msg from delegeted generator",
    fn() {
        function* a(x) {
            yield 1;
            yield 2;
            let ok = yield* b();
            console.log(ok);
            yield 5;
        }

        function* b() {
            yield 3;
            yield 4;
            return "end"
        }
        for (let c of a()) {
            console.log(c);
        }
    }
}, {
    name: "async",
    run: false,
    fn() {
        function dosomeasync(c) {
            setTimeout(() => {
                c("done");
            }, 2000);
        }

        function normalCallback(cb) {
            dosomeasync(function (d) {
                return cb(d);
            })
        }

        function doAPromise() {
            return new Promise((res, rej) => {
                dosomeasync((d) => {
                    res(d);
                })
            });
        }


        function* doAGenerator() {
            let rst = yield dosomeasync(function (d) {
                g.next(d);
            });
            console.log(`${rst} with generator`);
        }

        let g = doAGenerator();
        g.next();


        normalCallback(function (v) {
            console.log(`${v} with normalCallback`);
        });

        doAPromise().then(v => {
            console.log(`${v} with promise`);
        });
    }
}, {
    name: "auto Wrapup",
    fn() {
        function dosomeasync(data) {
            return new Promise((r, j) => {
                setTimeout(() => {
                    r(data);
                }, 2000);
            })

        }

        function runGen(gen) {
            let g = gen();
            let rst, end = false;

            (function rec(value) {
                rst = g.next(value);
                end = rst.done;
                if (end != true) {
                    rst.value.then(rec);
                }
            })();

            // for (let a of gen()){

            // }
        }

        runGen(function* () {
            let [a, b, c] = yield Promise.all([dosomeasync(1), dosomeasync(3), dosomeasync(5)]);
            console.log(a, b, c);
            let r2 = yield dosomeasync(2);
            console.log(r2);
        });
    },
    run: false
}, {
    name: "using library",
    // run:false,
    fn() {
        function dosomeasync(data) {
            return new Promise((r, j) => {
                setTimeout(() => {
                    if (data == 3) {
                        j(data);
                    } else {
                        r(data);
                    }
                }, 2000);
            })

        }
        co(function* () {
            try {
                let [a, b, c] = yield Promise.all([dosomeasync(1), dosomeasync(3), dosomeasync(5)]);
                console.log(a, b, c);
                let r2 = yield dosomeasync(2);
                console.log(r2);
            } catch (e) {
                console.log("rejected and clearnUp transition");
            }
            let c = yield dosomeasync("end");
            console.log(c);

        });
        // Q.spawn(function* () {
        //     try {
        //         let [a, b, c] = yield Promise.all([dosomeasync(1), dosomeasync(3), dosomeasync(5)]);
        //         console.log(a, b, c);
        //         let r2 = yield dosomeasync(2);
        //         console.log(r2);
        //     } catch (e) {
        //         console.log("rejected and clearnUp transition");
        //     }
        //     let c = yield dosomeasync("end");
        //     console.log(c);

        // })

    }
}]

toRun.forEach(v => {
    if (v.run === void(0) || v.run == true) {
        console.log(`++++++++++++++start '${v.name}'+++++++++++++`)
        v.fn();
        console.log(`--------------end '${v.name}'-------------`)
    }
})