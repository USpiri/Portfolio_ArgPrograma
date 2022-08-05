import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/model/personEntity';
import { Image } from 'src/app/model/imageEntity';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']
})
export class GreetingComponent implements OnInit {

  @Input() data:Person = new Person( "","","","","","","","","" );
  @Input() image:Image = new Image( "","" );

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
