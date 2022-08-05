import { Component, Input, OnInit } from '@angular/core';
import { Email } from 'src/app/model/emailEntity';
import { Person } from 'src/app/model/personEntity';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() data:Person = new Person( "","","","","","","","","" );
  email:{ name:String, email:String, subject:String, message:String } = {
    name: "",
    email: "",
    subject: "",
    message: ""
  };
  send:Email = new Email("","","");


  constructor(
    private emailSender:EmailService
  ) { }

  ngOnInit(): void {
  }

  sendEmail(){
    this.send.subject = this.email.subject;
    this.send.message = this.formatMessage(this.email);
    this.emailSender.sendEmail(this.send).subscribe();
  }

  formatMessage(data:any){
    return "Someone wats to conntact with you! \n Name: " + data.name + "\n Email: "
    + data.email + "\n Message: '" + data.message + "'";
  }

}
