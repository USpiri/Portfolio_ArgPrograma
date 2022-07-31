export class Person {

    id?: number;
    name: String;
    surname: String;
    address: String;
    birth_date: String;
    age: String;
    phone: String;
    email: String;
    lit_about: String;
    about: String;

    constructor( name:String, surname:String, address:String, birth_date:String, age:String, phone:String, email:String, lit_about:String, about:String ){
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.birth_date = birth_date;
        this.age = age;
        this.phone = phone;
        this.email = email;
        this.lit_about = lit_about;
        this.about = about;
    }

}