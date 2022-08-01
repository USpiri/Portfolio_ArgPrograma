import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/model/experienceEntity';
import { JobType } from 'src/app/model/jobTypeEntity';
import { ExperienceService } from 'src/app/services/experience.service';
import { JobTypeService } from 'src/app/services/job-type.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  data:Experience[] = [];
  jobs:JobType[] = [];
  file:any;

  experienceToEdit : Experience = new Experience( "","",false,"","","","",false,"" );
  experienceToAdd : Experience = new Experience( "","",false,"","","","",false,"Job type" );

  start_date: String = this.datePipe.transform( new Date() , "yyyy-MM-dd")!;
  end_date: String = this.datePipe.transform( new Date() , "yyyy-MM-dd")!;

  constructor(
    private dataExperience:ExperienceService,
    private dataJobs:JobTypeService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.dataExperience.getExperience().subscribe(
      experience => {
        this.data = experience;
      }
    );
    this.dataJobs.getJobs().subscribe(
      jobs => {
        this.jobs = jobs;
      }
    );
  }

  openEditModal( experience:Experience ){
    this.experienceToEdit = experience;
  }

  updateExperience(obj:{ file?:any, experience?:any  }){
    
    if (obj.file) {
      const dataForm = new FormData();
      dataForm.append( "experience", obj.file, obj.file.name );
      this.dataExperience.updateExperience(obj.experience).subscribe(
        exp => {
          let expToUpdate:Experience = exp
          this.dataExperience.updateImage( dataForm , expToUpdate ).subscribe(
            expe => {
              this.data.map(
                (exper, i) => {
                  if (exper.id === expe.id) {
                    this.data[i] = expe;
                    this.extraerBase64(obj.file).then(
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
      this.dataExperience.updateExperience(obj.experience).subscribe(
        exp => {
          this.data.map(
            (expe, i) => {
              if (expe.id === exp.id) {
                this.data[i] = exp;
              }
            }
          );
        }
      );
    }
  }

  addExperience(){
    const dataForm = new FormData();
    dataForm.append( "experience", this.file, this.file.name );

    this.experienceToAdd.start_date = this.datePipe.transform(this.date(this.start_date), "dd/MM/yyyy")!;
    this.experienceToAdd.end_date = this.datePipe.transform(this.date(this.end_date), "dd/MM/yyyy")!;
    this.dataExperience.addExperience(this.experienceToAdd).subscribe(
      exp => {
        let expToUpdate:Experience = exp
        this.dataExperience.updateImage( dataForm , expToUpdate ).subscribe(
          expe => {
            this.data.push(expe)
          }
        );
      }
    );
    this.onClose();
  }

  date( date:String ){
    const [year, month, day] = date.split('-');
    return new Date(Number(year), Number(month) -1 , Number(day));
  }

  onClose(){
    this.experienceToAdd = new Experience( "","",false,"","","","",false,"Job type" );
  }

  onDelete( experienceToDelete:Experience ){
    this.dataExperience.deleteExperience(experienceToDelete).subscribe(
      () => {
        this.data = this.data.filter(
          experience => experience.id !== experienceToDelete.id  
        );
      }
    );
  }

  captureFile(event:any){
    const savedFile = event.target.files[0];
    this.file = savedFile;
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
