export class Email {

    to:String;
    subject:String;
    message:String;

    constructor(to:String, subject:String, message:String){
        this.to = to;
        this.message = message;
        this.subject = subject;
    }

}