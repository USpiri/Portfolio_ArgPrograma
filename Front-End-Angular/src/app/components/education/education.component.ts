import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EducationService } from 'src/app/services/education.service';
import { Education } from '../../model/educationEntity';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  data: Education[] = [];

  educationToEdit: Education = new Education( "","",false,"","","","",false );
  educationToAdd: Education = new Education( "","",false,"","","","",false );

  start_date: String = this.datePipe.transform( new Date() , "yyyy-MM-dd")!;
  end_date: String = this.datePipe.transform( new Date() , "yyyy-MM-dd")!;

  constructor(
    private dataEducation:EducationService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.dataEducation.getEducation().subscribe(
      education => {
        this.data = education;
      }
    );
  }

  editModal( education:Education ){
    this.educationToEdit = education;
  }

  updateEducation(education:Education){
    this.dataEducation.updateEducation(education).subscribe(
      education => {
        this.data.map( 
          (educ , i) => {
            if( educ.id === education.id ){
              this.data[i]= education;
            }
          }
        );
      }
    );
  }

  addEducation(){
    this.educationToAdd.start_date = this.datePipe.transform(this.date(this.start_date), "dd/MM/yyyy")!;
    this.educationToAdd.end_date = this.datePipe.transform(this.date(this.end_date), "dd/MM/yyyy")!;
    this.dataEducation.addEducation(this.educationToAdd).subscribe(
      education => { 
        this.data.push(education);
      }
    );
    this.onClose();
  }

  date( date:String ){
    const [year, month, day] = date.split('-');
    return new Date(Number(year), Number(month) -1 , Number(day));
  }

  onClose(){
    this.educationToAdd = new Education( "","",false,"","","","",false );
  }

  onDelete( educationToDelete:Education ){
    this.dataEducation.deleteEducation(educationToDelete).subscribe(
      () => {
        this.data = this.data.filter(
          education => education.id !== educationToDelete.id  
        );
      }
    );
  }

}
