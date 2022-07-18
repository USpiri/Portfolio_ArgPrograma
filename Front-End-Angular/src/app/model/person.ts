export class Person {
    id: number = 0;
    name: String = "";
    surname: String = "";
    address: String = "";
    birth_date: String = "";
    age: String = "";
    phone: String = "";
    email: String = "";
    lit_about: String = "";
    about: String = "";
    images: { header:String, about:String } = {
        header: "",
        about: ""
    }
}