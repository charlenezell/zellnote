# Iteration protocols

## iterable and iterator

1. An object with a [Symbol.iterator] wellform function is a iterable ;

    eg:
    ```javascript
    var a=[1,2,3];//a has [Symbol.iterator] is a iterable
    Array,Map,Set,generator,CustomIterable,NodeList...
    ```

1. An object is an iterator when it implements a next() method with the specific semantics

```javascript
function idMaker() {
    var index = 0;

    return {
       next: function(){
           return {value: index++, done: false};
       }
    };
}
```

## syntax using iterables

for-of loops, spread operator, yield*, and destructuring assignment

 ```javascript
 let a=[1,2,3];
 for (let c of a){
    console.log("");
 }
 [...a];
 function * b(){
     yeild* a;
 }

 [a1,a2,a3]=a;
 ```

 ## Is a generator object an iterator or an iterable? (yes)


## symbols

Symbols are not enumerable in for...in iterations. In addition, Object.getOwnPropertyNames() will not return symbol object properties, however, you can use Object.getOwnPropertySymbols() to get these.

Symbol-keyed properties will be completely ignored when using JSON.stringify():

for prevent name conflit and provide backward compatibility