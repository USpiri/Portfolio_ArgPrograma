import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { Education } from 'src/app/model/educationEntity';

@Component({
  selector: 'app-education-modal',
  templateUrl: './education-modal.component.html',
  styleUrls: ['./education-modal.component.css']
})
export class EducationModalComponent implements OnInit, OnChanges {

  @Input() education:Education = new Education( "","",false,"","","","",false );
  @Output() onUpdateEducation:EventEmitter<any> = new EventEmitter();
  @ViewChild('educationInput',{ static : false}) InputEducation?:ElementRef;
  @ViewChild('clsEducation') closeButton:any;
  
  educationSave:Education = new Education( "","",false,"","","","",false );
  educationActual:Education = new Education( "","",false,"","","","",false );

  file:any;
  send:{ file?:any, education?:any  } ={}

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

  captureFile(event:any){
    const savedFile = event.target.files[0];
    this.file = savedFile;
  }

  date( date:String ){
    const [day, month, year] = date.split('/');
    return new Date(Number(year), Number(month) -1 , Number(day));
  }

  onSubmit(educationForm:any){
    Object.assign( this.educationSave, this.educationActual );
    this.educationSave.start_date = this.datePipe.transform(this.formated_start_date, "dd/MM/yyyy")!;
    if (this.educationSave.is_actual) {
      this.educationSave.end_date = "the present";
    } else {
      this.educationSave.end_date = this.datePipe.transform(this.formated_end_date, "dd/MM/yyyy")!;
    }
    this.send.education = this.educationSave;
    this.send.file = this.file;
    this.onUpdateEducation.emit(this.send);
    this.closeButton.nativeElement.click();
    this.onClose(educationForm);
  }

  onClose(educationForm:any){
    Object.assign( this.educationActual, this.education );
    this.formated_start_date = this.datePipe.transform(this.date(this.education.start_date), "yyyy-MM-dd");
    if (!this.educationActual.is_actual) {
      this.formated_end_date = this.datePipe.transform(this.date(this.education.end_date), "yyyy-MM-dd");
    }
    this.file = null;
    this.InputEducation!.nativeElement.value= "";
    educationForm.resetForm();
  }

}
