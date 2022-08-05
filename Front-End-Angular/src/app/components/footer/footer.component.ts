import { Component, Input, OnInit } from '@angular/core';
import { Social } from 'src/app/model/socialMediaEntity';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() data:Social = new Social("","","","","","");

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
