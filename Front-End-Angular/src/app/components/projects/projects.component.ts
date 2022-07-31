import { Component, OnInit } from '@angular/core';
import SwiperCore, { Keyboard, Pagination, Navigation, Autoplay, SwiperOptions } from 'swiper';
SwiperCore.use([Keyboard, Pagination, Navigation, Autoplay]);
import { Project } from 'src/app/model/projectEntity';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  data: Project[] = [];

  projectToEdit: Project = new Project( "","","","",false );
  projectToAdd: Project = new Project( "","","","",false );

  config: SwiperOptions = {
    loopedSlides: 5,
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
    private dataProject:ProjectService
  ) { }

  ngOnInit(): void {
    this.dataProject.getProjects().subscribe(
      projects => {
        this.data = projects;
      }
    );
  }

  resetProject(){
    this.projectToAdd = {
      id: 0,
      name: "",
      description: "",
      img_url: "",
      link: "",
      enabled_link: true
    }
  }

  onAddProject(){
    this.dataProject.addProject(this.projectToAdd).subscribe(
      project => {
        this.data.push(project);
      }
    );
    this.resetProject();
  }

  onDelete(project:Project){
    this.dataProject.deleteProject(project).subscribe(
      () => {
        this.data = this.data.filter(
          projectStored => projectStored.id !== project.id
        );
      }
    )
  }

  onEdit(project:Project){
    Object.assign( this.projectToEdit, project );
  }

  updateProject(){
    this.dataProject.updateProject(this.projectToEdit).subscribe(
      project => {
        this.data.map(
          (pro , i) => {
            if (pro.id === project.id) {
              this.data[i] = project;
            }
          }
        );
      }
    );
  }

}
