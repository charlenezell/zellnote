function a(person:Person){
  return "hello"+"world";
}
interface Person {
  firstName: string;
  lastName: string;
}
function b(a,b){
  this.firstName=a,this.lastName=b;
}

a(new b(1,2));

class Student {
  fullName: string;
  constructor(public firstName:string, public middleInitial:string, public lastName:string) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

var w=new Student("huang","","guangyao")

a(w);


