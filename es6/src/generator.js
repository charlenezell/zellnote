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
        for (let b of a()){
            console.log(b)
        }
        console.log("..........")
        for (let c of b()){
            console.log(c)
        }
    }
}]

toRun.forEach(v => {
    console.log(`++++++++++++++start '${v.name}'+++++++++++++`)
    v.fn();
    console.log(`--------------end '${v.name}'-------------`)
})