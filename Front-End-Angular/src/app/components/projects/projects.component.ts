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

  file:any;
  fileToEdit:any;

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
    const dataForm = new FormData();
    dataForm.append( "project", this.file, this.file.name );
    this.dataProject.addProject(this.projectToAdd).subscribe(
      projectn => {
        let pToUpdate:Project = projectn;
        this.dataProject.updateImage( dataForm, pToUpdate ).subscribe(
          pr => {
            let pToAdd:Project = pr;
            this.extraerBase64(this.file).then(
              (image:any) => {
                pToAdd.img_url = image.base;
              }
            )
            this.data.push(pToAdd);
          }
        );
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
    if (this.fileToEdit) {
      const dataForm = new FormData();
      dataForm.append( "project", this.fileToEdit, this.fileToEdit.name );
      this.dataProject.updateProject(this.projectToEdit).subscribe(
        project => {
          let pToUpdate:Project = project
          this.dataProject.updateImage( dataForm , pToUpdate ).subscribe(
            pro => {
              this.data.map(
                (proj, i) => {
                  if (proj.id === pro.id) {
                    this.data[i] = pro;
                    this.extraerBase64(this.fileToEdit).then(
                      (image:any) => {
                        this.data[i].img_url = image.base;
                      }
                    )
                  }
                }
              );
            }
          );
        }
      );
    } else {
      this.dataProject.updateProject(this.projectToEdit).subscribe(
        project => {
          this.data.map(
            (pro, i) => {
              if (pro.id === project.id) {
                this.data[i] = project;
              }
            }
          );
        }
      );
    }
  }

  getImg(event:any){
    const savedFile = event.target.files[0];
    this.file = savedFile;
  }

  getEditImg(event:any){
    const savedFile = event.target.files[0];
    this.fileToEdit = savedFile;
  }

  extraerBase64 = async ($event: any) => new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
      return null;
    } catch (e) {
      return null;
    }
  })

}
