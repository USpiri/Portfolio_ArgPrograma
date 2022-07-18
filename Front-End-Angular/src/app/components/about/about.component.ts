import { Component, OnInit } from '@angular/core';
import { links } from 'src/app/model/linksEntity';
import { person } from 'src/app/model/person';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  data:person = new person();
  links: links = new links();

  dataToEdit:person = new person();
  linksToEdit:links = new links();

  date:{ month: string , day: string , year: string } = {
    month: "",
    day: "",
    year: ""
  };

  constructor(
    private dataPortfolio:PortfolioService
  ) { }

  ngOnInit(): void {
    this.dataPortfolio.getData().subscribe(
      data => {
        this.updateData( this.data, data);
        this.updateData( this.dataToEdit, this.data );
        this.getLastIndex(data);
        this.updateLinks( this.linksToEdit, this.links );
        this.getBirthDate(this.data);
      }
    );
  }

  updateData ( dataTo:person , dataFrom: any ){
    dataTo.id = dataFrom.id;
    dataTo.name = dataFrom.name;
    dataTo.surname = dataFrom.surname;
    dataTo.address = dataFrom.address;
    dataTo.birth_date = dataFrom.birth_date;
    dataTo.age = dataFrom.age;
    dataTo.phone = dataFrom.phone;
    dataTo.email = dataFrom.email;
    dataTo.lit_about = dataFrom.lit_about;
    dataTo.about = dataFrom.about;
    dataTo.images.header = dataFrom.images.header;
    dataTo.images.about = dataFrom.images.about;
    // Object.assign( dataTo, dataFrom );
  }

  updateLinks( linksTo:links, linksFrom:links ){
    linksTo.facebook = linksFrom.facebook;
    linksTo.instagram = linksFrom.instagram;
    linksTo.twitter = linksFrom.twitter;
    linksTo.github = linksFrom.github;
    linksTo.cv = linksFrom.cv;
    // Object.assign( linksTo, linksFrom );
  }

  getLastIndex( data: any ){
    this.links.facebook = (data.links.facebook).substring((data.links.facebook).lastIndexOf('/')+1);
    this.links.instagram = (data.links.instagram).substring((data.links.instagram).lastIndexOf('/')+1);
    this.links.twitter = (data.links.twitter).substring((data.links.twitter).lastIndexOf('/')+1);
    this.links.github = (data.links.github).substring((data.links.github).lastIndexOf('/')+1);
    this.links.cv = data.links.cv;
  }

  getBirthDate( data: any ){
    this.date.year = data.birth_date.substring(data.birth_date.lastIndexOf(',')+2);
    this.date.day = data.birth_date.substring(data.birth_date.lastIndexOf(',')-2,data.birth_date.lastIndexOf(',')).trim();
    this.date.month = data.birth_date.split(' ')[0] //(new Date(Date.parse(data.birth_date)).getMonth()+1).toString(); 
  }

  onSubmit(){
    this.dataToEdit.birth_date = this.date.month + " " + this.date.day + ", " + this.date.year;
    this.updateData( this.data, this.dataToEdit );

    //Actualizar componente Footer

    //Actualizar Servidor
  }

}
