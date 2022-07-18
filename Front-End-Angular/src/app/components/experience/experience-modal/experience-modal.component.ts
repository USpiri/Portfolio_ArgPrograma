import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Experience } from '../../../model/experienceEntity';

@Component({
  selector: 'app-experience-modal',
  templateUrl: './experience-modal.component.html',
  styleUrls: ['./experience-modal.component.css']
})
export class ExperienceModalComponent implements OnInit, OnChanges {

  @Input() experience:Experience = new Experience();
  @Output() onUpdateExperience:EventEmitter<Experience> = new EventEmitter();

  id: number = 0;
  company: String = "";
  position: String = "";
  is_actual: boolean = false;
  start_date: String = "";
  end_date: String = "";
  img_url: String = "";
  link: String = "";
  enabled_link: boolean = false;
  job_type: String = "";

  formated_start_date: any;
  formated_end_date: any;
  
  experienceSave:Experience = this.experience;

  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    let change: SimpleChange = changes['experience'];
    if( change ){
      this.experienceSave = this.experience;
      this.updateCurrentExperience();
      try{
        this.formated_start_date = this.datePipe.transform(this.date(this.start_date), "yyyy-MM-dd");
        this.formated_end_date = this.datePipe.transform(this.date(this.end_date), "yyyy-MM-dd");
      } catch{}
    }
  }

  date( date:String ){
    const [day, month, year] = date.split('/');
    return new Date(Number(year), Number(month) -1 , Number(day));
  }

  onSubmit(){
    const editExperience:Experience = {
      id: this.experience.id,
      company: this.company,
      position: this.position,
      is_actual: this.is_actual,
      start_date: this.datePipe.transform(this.formated_start_date, "dd-MM-yyyy")!.split("-").join("/"),
      end_date: this.datePipe.transform(this.formated_end_date, "dd-MM-yyyy")!.split("-").join("/"),
      img_url: this.img_url,
      link: this.link,
      enabled_link: this.enabled_link,
      job_type: this.job_type,
    }
    this.onUpdateExperience.emit(editExperience)
  }

  updateCurrentExperience(){
    this.id = this.experience.id;
    this.company = this.experience.company;
    this.position = this.experience.position;
    this.is_actual = this.experience.is_actual;
    this.start_date = this.experience.start_date;
    this.end_date = this.experience.end_date;
    this.img_url = this.experience.img_url;
    this.link = this.experience.link;
    this.enabled_link = this.experience.enabled_link;
    this.job_type = this.experience.job_type;
  }
  resetWhenClose(){
    this.id = this.experienceSave.id;
    this.company = this.experienceSave.company;
    this.position = this.experienceSave.position;
    this.is_actual = this.experienceSave.is_actual;
    this.formated_start_date = this.datePipe.transform(this.date(this.experienceSave.start_date), "yyyy-MM-dd");
    this.formated_end_date = this.datePipe.transform(this.date(this.experienceSave.end_date), "yyyy-MM-dd");
    this.img_url = this.experienceSave.img_url;
    this.link = this.experienceSave.link;
    this.enabled_link = this.experienceSave.enabled_link;
    this.job_type = this.experienceSave.job_type;
  }

  onSaveActualCheckboxState( value:boolean ){
    this.is_actual = value;
  }

  onSaveEnabledCheckboxState( value:boolean ){
    this.enabled_link = value;
  }

}
