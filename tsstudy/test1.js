function a(person) {
    return "hello" + "world";
}
function b(a, b) {
    this.firstName = a, this.lastName = b;
}
a(new b(1, 2));
var Student = (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
var w = new Student("huang", "", "guangyao");
a(w);
