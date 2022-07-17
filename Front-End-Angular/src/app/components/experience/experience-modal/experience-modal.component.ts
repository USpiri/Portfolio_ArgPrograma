import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { experience } from '../../../model/experienceEntity';

@Component({
  selector: 'app-experience-modal',
  templateUrl: './experience-modal.component.html',
  styleUrls: ['./experience-modal.component.css']
})
export class ExperienceModalComponent implements OnInit, OnChanges {

  @Input() experience:experience = new experience();
  @Output() onUpdateExperience:EventEmitter<experience> = new EventEmitter();

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

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateCurrentExperience();
  }

  date( date:String ){
    const [day, month, year] = date.split('/');
    return new Date(Number(year), Number(month) -1 , Number(day));
  }

  onSubmit(){
    const editExperience:experience = {
      id: this.experience.id,
      company: this.company,
      position: this.position,
      is_actual: this.is_actual,
      start_date: this.start_date,
      end_date: this.end_date,
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

}
