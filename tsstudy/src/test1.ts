/// <reference path="../typings/jquery/jquery.d.ts" />
/// <amd-module name='NamedModule'/>
/*   _
 /' \
/\_, \
\/_/\ \
   \ \ \
    \ \_\
     \/_/

         */
/*! this comment remains untouched */
a({ firstName: "hehe", lastName: "jack" })
a(new b(1, 2));

var w = new Student("huang", "", "guangyao")
a(w);

/*MARK:interface*/
interface Person {
  firstName: string;
  lastName: string;
}

/*MARK: Class*/
class Student {
  fullName: string;
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

function a(person: Person) {
  return "hello" + "world";
}

function b(a, b) {
  this.firstName = a, this.lastName = b;
}

/*basic Type*/
let isDone: boolean = true;

let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

let color: string = "blue";
let pageHtml: string = `<html>
  <head></head>
  <body>
      ${color}
  </body>
</html>`;


let list: number[] = [1, 2, 3];
/*generic array type*/
let list2: Array<number> = [1, 2, 3];


// Tuple types allow you to express an array where the type of a fixed number of elements is known, but need not be the same. For example, you may want to represent a value as a pair of a string and a number:
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
// x = [10, 'hello']; // Error

console.log(x[0].substr(1)); // OK
// console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'编译时发现

x[5] = "xiaoming";
// x[5] = true;   unionType fail in this context?

enum Color {Red, Green, Blue};
let c: Color = Color.Green;


enum Color2 { Red = 1, Green, Blue };//Start from 1
let d: Color2 = Color2.Green;

enum Color3 { Red = 1, Green = 2, Blue = 4 };//manual
let e: Color3 = Color3.Green;

console.log(Color3[4])

function getPersonInfo(person:Person){
  let someData:any;
    someData=$.get("x",{sync:true});
    if(!someData){
      return false;
    }else{
      return someData;
    }
}

function callMe(hello:string):void {
  console.log(hello)
}

let someValue: any = "this is a string";
let someValue2: any = [1,2,3,4];

/*推断转型*/
/*The two samples are equivalent. Using one over the other is mostly a choice of preference; however, when using TypeScript with JSX, only as-style assertions are allowed.*/
let strLength: number = (<[]>someValue).length;
let strLength2: number = (<string>someValue2).length;
let strLength3: number = (someValue2 as []).length;

const APPLE:string="apple";

// APPLE=123; error
//
let BANANA:string="strBanana";

for(let i:number=0;i<100;i++){
  let BANANA:number=i;
  {
    let i:string="banana";
    console.log(i)
  }
  console.log(BANANA)
}

console.log(BANANA);

function sumMatrix(matrix: number[][]) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }

    return sum;
}
function getNodeList():NodeList{
  return document.getElementsByTagName("img");
}
for(let a=0;a<20;a++){
  setTimeout(function(){
    console.log(a);
  })
}
function www(){
  setTimeout(function(){
    console.log(this)
  })
}
function www2(){
  setTimeout(()=>{
    console.log(this)
  })
}
{
  let [a,b]=[1,2];
  console.log(a,b);
}
{
  let {a,b}={a:2,b:3};
  console.log(a,b);
}
{
  let {a:aa,b:bb}={a:2,b:3};
  console.log(aa,bb);
}
{
  let {a:aa, b:bb}: {a: string, b: number} = {a:"2",b:3};
  console.log(aa,bb);
}
function ggg(name:string="xiaoming"):string{
  return name;
}

type C = {a: string, b?: number}
function f({a, b}: C): void {
    // ...
}
f({
  a:"hello",
  b:2
});
{
  function f3({a, b}={a:1,b:2}): void {
      // ...
  }
  f3();
}
{
  function f2({a=1, b=2}): void {
      // ...
  }
  f2({a:5});
}

class AppComponent {
  title = 'Tour of Heroes';
  hero = 'Windstorm';
}

export {Person, getPersonInfo, AppComponent}

