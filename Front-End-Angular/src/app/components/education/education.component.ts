import { DatePipe } from '@angular/common';
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
  educationToAdd: Education = new Education();

  start_date: String = this.datePipe.transform( new Date() , "yyyy-MM-dd")!;
  end_date: String = this.datePipe.transform( new Date() , "yyyy-MM-dd")!;

  constructor(
    private dataPortfolio:PortfolioService,
    private datePipe: DatePipe
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

  addEducation(){
    //Add Server Update
    this.educationToAdd.start_date = this.datePipe.transform(this.date(this.start_date), "dd/MM/yyyy")!;
    this.educationToAdd.end_date = this.datePipe.transform(this.date(this.end_date), "dd/MM/yyyy")!;
    this.data.push(this.educationToAdd);
  }

  date( date:String ){
    const [year, month, day] = date.split('-');
    return new Date(Number(year), Number(month) -1 , Number(day));
  }

  onClose(){
    this.educationToAdd = new Education();
  }

  onDelete( educationToDelete:Education ){
    this.data = this.data.filter(
      education => education.id !== educationToDelete.id  
    )
  }

}
