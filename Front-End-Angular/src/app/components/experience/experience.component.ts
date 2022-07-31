import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/model/experienceEntity';
import { JobType } from 'src/app/model/jobTypeEntity';
import { ExperienceService } from 'src/app/services/experience.service';
import { JobTypeService } from 'src/app/services/job-type.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  data:Experience[] = [];
  jobs:JobType[] = []

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

  openEditModal( experience: any ){
    this.experienceToEdit = experience;
  }

  updateExperience(experience:Experience){
    this.dataExperience.updateExperience(experience).subscribe(
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

  addExperience(){
    this.experienceToAdd.start_date = this.datePipe.transform(this.date(this.start_date), "dd/MM/yyyy")!;
    this.experienceToAdd.end_date = this.datePipe.transform(this.date(this.end_date), "dd/MM/yyyy")!;
    this.dataExperience.addExperience(this.experienceToAdd).subscribe(
      exp => {
        this.data.push(exp)
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

}
