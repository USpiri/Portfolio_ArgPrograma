import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/model/personEntity';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/model/imageEntity';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']
})
export class GreetingComponent implements OnInit {

  data:Person = new Person( "","","","","","","","","" );
  image:Image = new Image( "","" );

  constructor(
    private dataPerson:PersonService,
    private dataImage:ImageService
  ) { }

  ngOnInit(): void {
    this.dataPerson.getPerson().subscribe(
      data => {
        if (data) {
          this.data = data;
        }
      }
    );
    this.dataImage.getImages().subscribe(
      images => {
        if (images) {
          this.image = images;
        }
      }
    )
  }

}
