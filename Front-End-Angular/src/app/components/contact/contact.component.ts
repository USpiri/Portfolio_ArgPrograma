import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/model/emailEntity';
import { Person } from 'src/app/model/personEntity';
import { EmailService } from 'src/app/services/email.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  data:Person = new Person( "","","","","","","","","" );
  email:{ name:String, email:String, subject:String, message:String } = {
    name: "",
    email: "",
    subject: "",
    message: ""
  };
  send:Email = new Email("","","");


  constructor(
    private dataPerson:PersonService,
    private emailSender:EmailService
  ) { }

  ngOnInit(): void {
    this.dataPerson.getPerson().subscribe(
      data => {
        this.data = data;
      }
    );
  }

  sendEmail(){
    this.send.subject = this.email.subject;
    this.send.message = this.formatMessage(this.email);
    this.emailSender.sendEmail(this.send).subscribe(
      r => console.log(r)
    );
  }

  formatMessage(data:any){
    return "Someone wats to conntact with you! \n Name: " + data.name + "\n Email: "
    + data.email + "\n Message: '" + data.message + "'";
  }

}
