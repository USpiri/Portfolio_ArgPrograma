import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/model/personEntity';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  data:Person = new Person( "","","","","","","","","" );

  constructor(
    private dataPerson:PersonService
  ) { }

  ngOnInit(): void {
    this.dataPerson.getPerson().subscribe(
      data => {
        this.data = data;
      }
    );
  }

}
