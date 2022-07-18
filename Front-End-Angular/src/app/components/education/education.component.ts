import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Education } from '../../model/educationEntity';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  data: Education[] = [];

  educationToEdit: Education = new Education();

  constructor(
    private dataPortfolio:PortfolioService
  ) { }

  ngOnInit(): void {
    this.dataPortfolio.getData().subscribe(
      data => {
        this.data = data.education;
      }
    );
  }

  openEditModal( education:Education ){
    this.educationToEdit = education;
  }

  updateEducation(education:Education){

    //Update View
    this.data.map( 
      (educ , i) => {
        if( educ.id == education.id ){
          this.data[i]= education;
        }
      }
    );
      
    //Update Server
    console.log(education);
  }

}
