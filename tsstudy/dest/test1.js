define("NamedModule", ["require", "exports"], function (require, exports) {
    "use strict";
    a({ firstName: "hehe", lastName: "jack" });
    a(new b(1, 2));
    var w = new Student("huang", "", "guangyao");
    a(w);
    var Student = (function () {
        function Student(firstName, middleInitial, lastName) {
            this.firstName = firstName;
            this.middleInitial = middleInitial;
            this.lastName = lastName;
            this.fullName = firstName + " " + middleInitial + " " + lastName;
        }
        return Student;
    }());
    function a(person) {
        return "hello" + "world";
    }
    function b(a, b) {
        this.firstName = a, this.lastName = b;
    }
    var isDone = true;
    var decimal = 6;
    var hex = 0xf00d;
    var binary = 10;
    var octal = 484;
    var color = "blue";
    var pageHtml = "<html>\n  <head></head>\n  <body>\n      " + color + "\n  </body>\n</html>";
    var list = [1, 2, 3];
    var list2 = [1, 2, 3];
    var x;
    x = ['hello', 10];
    console.log(x[0].substr(1));
    x[5] = "xiaoming";
    var Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Green"] = 1] = "Green";
        Color[Color["Blue"] = 2] = "Blue";
    })(Color || (Color = {}));
    ;
    var c = Color.Green;
    var Color2;
    (function (Color2) {
        Color2[Color2["Red"] = 1] = "Red";
        Color2[Color2["Green"] = 2] = "Green";
        Color2[Color2["Blue"] = 3] = "Blue";
    })(Color2 || (Color2 = {}));
    ;
    var d = Color2.Green;
    var Color3;
    (function (Color3) {
        Color3[Color3["Red"] = 1] = "Red";
        Color3[Color3["Green"] = 2] = "Green";
        Color3[Color3["Blue"] = 4] = "Blue";
    })(Color3 || (Color3 = {}));
    ;
    var e = Color3.Green;
    console.log(Color3[4]);
    function getPersonInfo(person) {
        var someData;
        someData = $.get("x", { sync: true });
        if (!someData) {
            return false;
        }
        else {
            return someData;
        }
    }
    exports.getPersonInfo = getPersonInfo;
    function callMe(hello) {
        console.log(hello);
    }
    var someValue = "this is a string";
    var someValue2 = [1, 2, 3, 4];
    var strLength = someValue.length;
    var strLength2 = someValue2.length;
    var strLength3 = someValue2.length;
    var APPLE = "apple";
    var BANANA = "strBanana";
    for (var i = 0; i < 100; i++) {
        var BANANA_1 = i;
        {
            var i_1 = "banana";
            console.log(i_1);
        }
        console.log(BANANA_1);
    }
    console.log(BANANA);
    function sumMatrix(matrix) {
        var sum = 0;
        for (var i = 0; i < matrix.length; i++) {
            var currentRow = matrix[i];
            for (var i_2 = 0; i_2 < currentRow.length; i_2++) {
                sum += currentRow[i_2];
            }
        }
        return sum;
    }
    function getNodeList() {
        return document.getElementsByTagName("img");
    }
    var _loop_1 = function(a_1) {
        setTimeout(function () {
            console.log(a_1);
        });
    };
    for (var a_1 = 0; a_1 < 20; a_1++) {
        _loop_1(a_1);
    }
    function www() {
        setTimeout(function () {
            console.log(this);
        });
    }
    function www2() {
        var _this = this;
        setTimeout(function () {
            console.log(_this);
        });
    }
    {
        var _a = [1, 2], a_2 = _a[0], b_1 = _a[1];
        console.log(a_2, b_1);
    }
    {
        var _b = { a: 2, b: 3 }, a_3 = _b.a, b_2 = _b.b;
        console.log(a_3, b_2);
    }
    {
        var _c = { a: 2, b: 3 }, aa = _c.a, bb = _c.b;
        console.log(aa, bb);
    }
    {
        var _d = { a: "2", b: 3 }, aa = _d.a, bb = _d.b;
        console.log(aa, bb);
    }
    function ggg(name) {
        if (name === void 0) { name = "xiaoming"; }
        return name;
    }
    function f(_a) {
        var a = _a.a, b = _a.b;
    }
    f({
        a: "hello",
        b: 2
    });
    {
        function f3(_a) {
            var _b = _a === void 0 ? { a: 1, b: 2 } : _a, a = _b.a, b = _b.b;
        }
        f3();
    }
    {
        function f2(_a) {
            var _b = _a.a, a = _b === void 0 ? 1 : _b, _c = _a.b, b = _c === void 0 ? 2 : _c;
        }
        f2({ a: 5 });
    }
});
