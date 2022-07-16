import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { education } from '../../model/educationEntity';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  data: education[] = [];

  educationToEdit: education = {
    id: 0,
    institute: "",
    title: "",
    is_actual: false,
    start_date: "",
    end_date: "",
    img_url: "",
    link: "",
    enabled_link: false
  }

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

  openEditModal( education: any ){
    this.educationToEdit = education;
  }

  updateEducation(education:education){

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
