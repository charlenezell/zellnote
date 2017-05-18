# proxy

The Proxy object is used to define custom behavior
for fundamental operations (e.g. property lookup, assignment, enumeration, function invocation, etc).

example:

```javascript
var handler = {
    get: function(target, name) {
        return name in target ?
            target[name] :
            37;
    }
};

var p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b); // 1, undefined
console.log('c' in p, p.c); // false, 37
```

No-op forwarding proxy

```javascript
var target = {};
var p = new Proxy(target, {});

p.a = 37; // operation forwarded to the target

console.log(target.a); // 37. The operation has been properly forwarded
```

extending constructor

```javascript
function extend(sup, base) {
  var descriptor = Object.getOwnPropertyDescriptor(
    base.prototype, 'constructor'
  );
  base.prototype = Object.create(sup.prototype);
  var handler = {
    construct: function(target, args) {
      var obj = Object.create(base.prototype);
      this.apply(target, obj, args);
      return obj;
    },
    apply: function(target, that, args) {
      sup.apply(that, args);
      base.apply(that, args);
    }
  };
  var proxy = new Proxy(base, handler);
  descriptor.value = proxy;
  Object.defineProperty(base.prototype, 'constructor', descriptor);
  return proxy;
}

var Person = function(name) {
  this.name = name;
};

var Boy = extend(Person, function(name, age) {
  this.age = age;
});

Boy.prototype.sex = 'M';

var Peter = new Boy('Peter', 13);
console.log(Peter.sex);  // "M"
console.log(Peter.name); // "Peter"
console.log(Peter.age);  // 13
```

use with reflection api

```javascript
var handler = {
  get () {
    return Reflect.get(...arguments)
  }
}
var target = { a: 'b' }
var proxy = new Proxy(target, handler)
console.log(proxy.a)

//even

var handler = {
  get: Reflect.get
}
var target = { a: 'b' }
var proxy = new Proxy(target, handler)
console.log(proxy.a)
```