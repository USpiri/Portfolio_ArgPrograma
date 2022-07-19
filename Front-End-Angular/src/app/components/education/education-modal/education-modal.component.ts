import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter, SimpleChange } from '@angular/core';
import { Education } from 'src/app/model/educationEntity';

@Component({
  selector: 'app-education-modal',
  templateUrl: './education-modal.component.html',
  styleUrls: ['./education-modal.component.css']
})
export class EducationModalComponent implements OnInit, OnChanges {

  @Input() education:Education = new Education();
  @Output() onUpdateEducation:EventEmitter<Education> = new EventEmitter();
  
  educationSave:Education = new Education();
  educationActual:Education = new Education();

  formated_start_date: any;
  formated_end_date: any;
  
  constructor(
    private datePipe: DatePipe
  ) { }
  
  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    let change: SimpleChange = changes['education'];
    if( change ){
      Object.assign( this.educationActual, this.education );
      try{
        this.formated_start_date = this.datePipe.transform(this.date(this.educationActual.start_date), "yyyy-MM-dd");
        this.formated_end_date = this.datePipe.transform(this.date(this.educationActual.end_date), "yyyy-MM-dd");
      } catch{ }
    }
  }

  date( date:String ){
    const [day, month, year] = date.split('/');
    return new Date(Number(year), Number(month) -1 , Number(day));
  }

  onSubmit(){
    Object.assign( this.educationSave, this.educationActual );
    this.educationSave.start_date = this.datePipe.transform(this.formated_start_date, "dd/MM/yyyy")!;
    this.educationSave.end_date = this.datePipe.transform(this.formated_end_date, "dd/MM/yyyy")!;
    this.onUpdateEducation.emit(this.educationSave)
  }

  onClose(){
    Object.assign( this.educationActual, this.education );
    this.formated_start_date = this.datePipe.transform(this.date(this.education.start_date), "yyyy-MM-dd");
    this.formated_end_date = this.datePipe.transform(this.date(this.education.end_date), "yyyy-MM-dd");
  }

}
