import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter, SimpleChange } from '@angular/core';
import { education } from 'src/app/model/educationEntity';

@Component({
  selector: 'app-education-modal',
  templateUrl: './education-modal.component.html',
  styleUrls: ['./education-modal.component.css']
})
export class EducationModalComponent implements OnInit, OnChanges {

  @Input() education:education = {
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

  @Output() onUpdateEducation:EventEmitter<education> = new EventEmitter();
  
  id: number = 0;
  institute: String = "";
  title: String = "";
  is_actual: boolean = false;
  start_date: String = "";
  end_date: String = "";
  img_url: String = "";
  link: String = "";
  enabled_link: boolean = false;

  formated_start_date: any;
  formated_end_date: any;
  
  educationSave:education = this.education;
  
  constructor(
    private datePipe: DatePipe
  ) { }
  
  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    let change: SimpleChange = changes['education'];
    if( change ){
      this.educationSave = this.education;
      this.updateCurrentEducation();
      try{
        this.formated_start_date = this.datePipe.transform(this.date(this.start_date), "yyyy-MM-dd");
        this.formated_end_date = this.datePipe.transform(this.date(this.end_date), "yyyy-MM-dd");
      } catch{ }
    }
  }

  date( date:String ){
    const [day, month, year] = date.split('/');
    return new Date(Number(year), Number(month) -1 , Number(day));
  }

  onSubmit(){
    const editEducation:education = {
      id: this.education.id,
      institute: this.institute,
      title: this.title,
      is_actual: this.is_actual,
      start_date: this.datePipe.transform(this.formated_start_date, "dd-MM-yyyy")!.split("-").join("/"),
      end_date: this.datePipe.transform(this.formated_end_date, "dd-MM-yyyy")!.split("-").join("/"),
      img_url: this.img_url,
      link: this.link,
      enabled_link: this.enabled_link
    }
    this.onUpdateEducation.emit(editEducation)
  }

  updateCurrentEducation(){
    this.id = this.education.id;
    this.institute = this.education.institute;
    this.title = this.education.title;
    this.is_actual = this.education.is_actual;
    this.start_date = this.education.start_date;
    this.end_date = this.education.end_date;
    this.img_url = this.education.img_url;
    this.link = this.education.link;
    this.enabled_link = this.education.enabled_link;
  }

  resetWhenClose(){
    this.id = this.educationSave.id;
    this.institute = this.educationSave.institute;
    this.title = this.educationSave.title;
    this.is_actual = this.educationSave.is_actual;
    this.start_date = this.educationSave.start_date;
    this.end_date = this.educationSave.end_date;
    this.img_url = this.educationSave.img_url;
    this.link = this.educationSave.link;
    this.enabled_link = this.educationSave.enabled_link;
    this.formated_start_date = this.datePipe.transform(this.date(this.educationSave.start_date), "yyyy-MM-dd");
    this.formated_end_date = this.datePipe.transform(this.date(this.educationSave.end_date), "yyyy-MM-dd");
  }

  onSaveActualCheckboxChange( value:boolean ){
    this.is_actual = value;
  }

  onSaveEnabledCheckboxChange( value:boolean ){
    this.is_actual = value;
  }

}
