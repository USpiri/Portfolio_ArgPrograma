import { Component, OnInit } from '@angular/core';
import { Social } from 'src/app/model/socialMediaEntity';
import { SocialService } from 'src/app/services/social.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  data:Social = new Social("","","","","","");

  constructor(
    private dataSocial:SocialService
  ) { }

  ngOnInit(): void {
    this.dataSocial.getLinks().subscribe(
      data => {
        this.data = data;
      }
    );
  }

}
