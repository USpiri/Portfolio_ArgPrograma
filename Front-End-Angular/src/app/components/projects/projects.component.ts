import { Component, OnInit } from '@angular/core';
import SwiperCore, { Keyboard, Pagination, Navigation, Virtual, Autoplay } from 'swiper';
SwiperCore.use([Keyboard, Pagination, Navigation, Virtual, Autoplay]);

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
