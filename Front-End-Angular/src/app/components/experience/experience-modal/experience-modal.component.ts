import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { JobType } from 'src/app/model/jobTypeEntity';
import { JobTypeService } from 'src/app/services/job-type.service';
import { Experience } from '../../../model/experienceEntity';

@Component({
  selector: 'app-experience-modal',
  templateUrl: './experience-modal.component.html',
  styleUrls: ['./experience-modal.component.css']
})
export class ExperienceModalComponent implements OnInit, OnChanges {

  @Input() experience:Experience = new Experience( "","",false,"","","","",false,"" );
  @Output() onUpdateExperience:EventEmitter<any> = new EventEmitter();
  @ViewChild('experienceEditInput',{ static : false}) InputExperience?:ElementRef;
  @ViewChild('clsEditExperience') closeButton:any;

  experienceSave:Experience = new Experience( "","",false,"","","","",false,"" );
  experienceActual:Experience = new Experience( "","",false,"","","","",false,"" );

  jobs:JobType[] = [];
  file:any;
  send:{ file?:any, experience?:any  } ={}

  formated_start_date: any;
  formated_end_date: any;
  
  constructor(
    private datePipe: DatePipe,
    private dataJobs:JobTypeService
  ) { }

  ngOnInit(): void {
    this.dataJobs.getJobs().subscribe(
      data => {
        this.jobs = data;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    let change: SimpleChange = changes['experience'];
    if( change ){
      Object.assign( this.experienceActual, this.experience );
      try{
        this.formated_start_date = this.datePipe.transform(this.date(this.experienceActual.start_date), "yyyy-MM-dd");
        this.formated_end_date = this.datePipe.transform(this.date(this.experienceActual.end_date), "yyyy-MM-dd");
      } catch{}
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

  onSubmit(experienceEditForm:any){
    Object.assign( this.experienceSave, this.experienceActual );
    this.experienceSave.start_date = this.datePipe.transform(this.formated_start_date, "dd/MM/yyyy")!;
    if (this.experienceSave.is_actual) {
      this.experienceSave.end_date = "the present";
    } else {
      this.experienceSave.end_date = this.datePipe.transform(this.formated_end_date, "dd/MM/yyyy")!;
    }
    this.send.experience = this.experienceSave;
    this.send.file = this.file;
    this.onUpdateExperience.emit(this.send);
    this.closeButton.nativeElement.click();
    experienceEditForm.resetForm();
    this.file = null;
    this.InputExperience!.nativeElement.value= "";
  }

  onClose(){
    Object.assign( this.experienceActual, this.experience );
    this.formated_start_date = this.datePipe.transform(this.date(this.experience.start_date), "yyyy-MM-dd");
    if (!this.experienceActual.is_actual) {
      this.formated_end_date = this.datePipe.transform(this.date(this.experience.end_date), "yyyy-MM-dd");
    }
    this.file = null;
    this.InputExperience!.nativeElement.value= "";
  }

}
