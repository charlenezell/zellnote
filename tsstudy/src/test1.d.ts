/// <reference path="../typings/jquery/jquery.d.ts" />
interface Person {
    firstName: string;
    lastName: string;
}
declare function getPersonInfo(person: Person): any;
declare class AppComponent {
    title: string;
    hero: string;
}
export { Person, getPersonInfo, AppComponent };
