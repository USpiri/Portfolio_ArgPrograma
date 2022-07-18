import { Component, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { Keyboard, Pagination, Navigation, Autoplay, SwiperOptions } from 'swiper';
SwiperCore.use([Keyboard, Pagination, Navigation, Autoplay]);
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Project } from 'src/app/model/projectEntity';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  data: Project[] = [];

  projectToEdit: Project = new Project();
  projectToAdd: Project = new Project();

  config: SwiperOptions = {
    loopedSlides: 6,
    initialSlide: 0,
    spaceBetween: 10,
    navigation: true,
    centeredSlides: true,
    keyboard: {
      enabled: true
    },
    loop: true,
    loopFillGroupWithBlank: false,
    pagination: {
      clickable: true
    },
    autoplay: true,
    speed: 1000,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      930: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      1250: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      1300: {
        slidesPerView: 5,
        spaceBetween: 30
      }
    }
  }

  constructor(
    private dataPortfolio:PortfolioService
  ) { }

  ngOnInit(): void {
    this.dataPortfolio.getData().subscribe(
      data => {
        this.data = data.projects;
      }
    );
  }

  resetProject(){
    this.projectToAdd = {
      id: 0,
      title: "",
      description: "",
      img: "",
      link: "",
      enabled_link: true
    }
  }

  onAddProject(){
    //Add Server update
    this.data.push(this.projectToAdd);
  }

  onDelete(project:Project){
    //Add Server update
    this.data = this.data.filter(
      projectStored => projectStored.id !== project.id
    );
  }

  onEdit(project:Project){
    Object.assign( this.projectToEdit, project );
  }

  updateProject(){
    //Add Server update
    this.data.map(
      (project , i) => {
        if (project.id == this.projectToEdit.id) {
          this.data[i] = this.projectToEdit;
        }
      }
    );
  }

}
