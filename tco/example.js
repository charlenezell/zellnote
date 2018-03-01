// 实现1,1,2*1+1,2*3+1,2*7+1....
/**递归版 */
function a(num) {
    if (num < 3) {
        return 1
    } else {
        return 2 * a(num - 1) + 1
    }
}

// console.log(a(17962));//stackoverflow

/**尾递归版 */
function b(num, w=1) {
    if (num < 3) {
        return w
    } else {
        return b(num - 1, 2 * w + 1);
    }
}

// b(17962) //还是爆栈,chrome没有尾递归优化
var www = 200
console.log("b",a(www) == b(www))
/**babel版转循环 */
function c(num) {
    var w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var _repeat = true;

    var _num, _w;

    while (_repeat) {
        _repeat = false;

        if (num < 3) {
            return w;
        } else {
            _num = num - 1;
            _w = 2 * w + 1;
            num = _num;
            w = _w;
            _repeat = true;
            continue;
        }
    }
}

// c(17962)babel 的尾递归优化后已经不会爆栈

console.log("c",a(www) == c(www))
/**转新函数的递归版 */
function trampoline(f) {
    while (f && f instanceof Function) {
        f = f();
    }
    return f;
}

function d(num, w=1) {
    if (num < 3) {
        return w
    } else {
        return d.bind(null, num - 1, 2 * w + 1)
    }
}
// trampoline(d(17962)) //
console.log("d",a(www) == trampoline(d(www)))

function e(num, w=1) {

    while (num--) {
        if (num > (3 - 2)) {
            w = 2 * w + 1
        }
    }
    return w;

}
// console.log(e(17962)) 循环
console.log("e",a(www) == e(www))

/**待理解的转换尾递归方法 */
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

function f(num, w=1) {
    if (num < 3) {
        return w
    } else {
        return f(num - 1, 2 * w + 1);
    }
}

f=tco(f);

// console.log(f(17962))

console.log("f",a(www) == f(www))

