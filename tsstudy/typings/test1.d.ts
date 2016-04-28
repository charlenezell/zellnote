/// <reference path="../typings/jquery/jquery.d.ts" />
interface Person {
    firstName: string;
    lastName: string;
}
declare function getPersonInfo(person: Person): any;
export { Person, getPersonInfo };
