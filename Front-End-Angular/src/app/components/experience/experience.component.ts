import { Component, OnInit, ViewChild } from '@angular/core';
import { experience } from 'src/app/model/experienceEntity';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  data:experience[] = [];
  @ViewChild('editExperienceModal') editExperienceModal : any;

  experienceToEdit : experience = {
    company: "",
    enabled_link: false,
    end_date: "",
    id: 0,
    img_url: "",
    is_actual: false,
    job_type: "",
    link: "",
    position: "",
    start_date: "",
  }

  constructor(
    private dataPortfolio:PortfolioService
  ) { }

  ngOnInit(): void {
    this.dataPortfolio.getData().subscribe(
      data => {
        this.data = data.experience;
      }
    );
  }

  openEditModal( experience: any ){
    this.experienceToEdit = experience;
  }

  updateExperience(experience:experience){

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

}
