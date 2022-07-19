import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/model/experienceEntity';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  data:Experience[] = [];
  jobs: { id:number, name:String }[] = []

  experienceToEdit : Experience = new Experience();
  experienceToAdd : Experience = new Experience();

  start_date: String = this.datePipe.transform( new Date() , "yyyy-MM-dd")!;
  end_date: String = this.datePipe.transform( new Date() , "yyyy-MM-dd")!;

  constructor(
    private dataPortfolio:PortfolioService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.dataPortfolio.getData().subscribe(
      data => {
        this.data = data.experience;
        this.jobs = data.jobTypes;
      }
    );
    this.experienceToAdd.job_type = "Job type";
  }

  openEditModal( experience: any ){
    this.experienceToEdit = experience;
  }

  updateExperience(experience:Experience){
    //Update View
    this.data.map( 
      (exp , i) => {
        if( exp.id == experience.id ){
          this.data[i]= experience;
        }
      }
    );
    //Update Server
    console.log(experience);
  }

  addExperience(){
    //Add Server Update
    this.experienceToAdd.start_date = this.datePipe.transform(this.date(this.start_date), "dd/MM/yyyy")!;
    this.experienceToAdd.end_date = this.datePipe.transform(this.date(this.end_date), "dd/MM/yyyy")!;
    this.data.push(this.experienceToAdd)
  }

  date( date:String ){
    const [year, month, day] = date.split('-');
    return new Date(Number(year), Number(month) -1 , Number(day));
  }

  onClose(){
    this.experienceToAdd = new Experience();
  }

  onDelete( experienceToDelete:Experience ){
    this.data = this.data.filter(
      experience => experience.id !== experienceToDelete.id  
    )
  }

}
