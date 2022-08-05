import { Component } from '@angular/core';
import { Image } from './model/imageEntity';
import { Person } from './model/personEntity';
import { Social } from './model/socialMediaEntity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  dataPerson:Person = new Person( "","","","","","","","","" );
  dataLinks:Social = new Social( "","","","","","" );
  dataImages:Image = new Image( "","" );

  title = 'Front-End-Angular';
  isLogged:boolean = false;
  login(event:boolean){
    this.isLogged=event;
  }
  updateData(event:{person:Person, links:Social, images:Image}){
    this.dataPerson = event.person;
    this.dataLinks = event.links;
    this.dataImages = event.images;
  }
}
