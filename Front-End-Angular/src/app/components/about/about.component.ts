import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  data:any;
  //date:any;
  links:{ facebook: string , instagram: string , twitter: string , github: string } = {
    facebook: "",
    instagram: "",
    twitter: "",
    github: ""
  };

  constructor(
    private dataPortfolio:PortfolioService
  ) { }

  ngOnInit(): void {
    this.dataPortfolio.getData().subscribe(
      data => {
        this.data = data;
        this.getLastIndex(data);
      }
    );
  }

  getLastIndex( data : any ){
    this.links.facebook = (data.links.facebook).substring((data.links.facebook).lastIndexOf('/')+1);
    this.links.instagram = (data.links.instagram).substring((data.links.instagram).lastIndexOf('/')+1);
    this.links.twitter = (data.links.twitter).substring((data.links.twitter).lastIndexOf('/')+1);
    this.links.github = (data.links.github).substring((data.links.github).lastIndexOf('/')+1);
  }

}
