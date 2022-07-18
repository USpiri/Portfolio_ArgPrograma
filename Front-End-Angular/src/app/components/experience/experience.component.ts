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

  experienceToEdit : Experience = new Experience();

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

}
