import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Experience } from '../../../model/experienceEntity';

@Component({
  selector: 'app-experience-modal',
  templateUrl: './experience-modal.component.html',
  styleUrls: ['./experience-modal.component.css']
})
export class ExperienceModalComponent implements OnInit, OnChanges {

  @Input() experience:Experience = new Experience();
  @Output() onUpdateExperience:EventEmitter<Experience> = new EventEmitter();

  experienceSave:Experience = new Experience();
  experienceActual:Experience = new Experience();

  jobs: { id:number, name:String }[] = []

  formated_start_date: any;
  formated_end_date: any;
  
  constructor(
    private datePipe: DatePipe,
    private dataPortfolio:PortfolioService
  ) { }

  ngOnInit(): void {
    this.dataPortfolio.getData().subscribe(
      data => {
        this.jobs = data.jobTypes;
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

  date( date:String ){
    const [day, month, year] = date.split('/');
    return new Date(Number(year), Number(month) -1 , Number(day));
  }

  onSubmit(){
    Object.assign( this.experienceSave, this.experienceActual )
    this.onUpdateExperience.emit(this.experienceSave)
  }

  onClose(){
    Object.assign( this.experienceActual, this.experience );
    this.formated_start_date = this.datePipe.transform(this.date(this.experience.start_date), "yyyy-MM-dd");
    this.formated_end_date = this.datePipe.transform(this.date(this.experience.end_date), "yyyy-MM-dd");
  }

}
