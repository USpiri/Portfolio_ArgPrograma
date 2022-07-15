import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  data:any;
  date:{ month: string , day: string , year: string } = {
    month: "",
    day: "",
    year: ""
  };
  links:{ facebook: string , instagram: string , twitter: string , github: string, cv: string } = {
    facebook: "",
    instagram: "",
    twitter: "",
    github: "",
    cv: ""
  };
  test: string = "hola 4, 1111";

  constructor(
    private dataPortfolio:PortfolioService
  ) { }

  ngOnInit(): void {
    this.dataPortfolio.getData().subscribe(
      data => {
        this.data = data;
        this.getLastIndex(data);
        this.getBirthDate(data);
      }
    );
  }

  getLastIndex( data: any ){
    this.links.facebook = (data.links.facebook).substring((data.links.facebook).lastIndexOf('/')+1);
    this.links.instagram = (data.links.instagram).substring((data.links.instagram).lastIndexOf('/')+1);
    this.links.twitter = (data.links.twitter).substring((data.links.twitter).lastIndexOf('/')+1);
    this.links.github = (data.links.github).substring((data.links.github).lastIndexOf('/')+1);
  }

  getBirthDate( data: any ){
    this.date.year = data.birth_date.substring(data.birth_date.lastIndexOf(',')+2);
    this.date.day = data.birth_date.substring(data.birth_date.lastIndexOf(',')-2,data.birth_date.lastIndexOf(',')).trim();
    this.date.month = (new Date(Date.parse(data.birth_date)).getMonth()+1).toString();    //data.birth_date.split(' ')[0]
  }

}
