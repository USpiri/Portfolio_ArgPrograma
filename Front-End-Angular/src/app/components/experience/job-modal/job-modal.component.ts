import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JobType } from 'src/app/model/jobTypeEntity';
import { JobTypeService } from 'src/app/services/job-type.service';

@Component({
  selector: 'app-job-modal',
  templateUrl: './job-modal.component.html',
  styleUrls: ['./job-modal.component.css']
})
export class JobModalComponent implements OnInit {

  @Output() submit:EventEmitter<JobType> = new EventEmitter();
  @Output() delete:EventEmitter<JobType> = new EventEmitter();
  
  jobs:JobType[] = [];
  jobTypeName:String = "";
  jobType:JobType = new JobType("");

  constructor(
    private dataJobs:JobTypeService 
  ) { }

  ngOnInit(): void {
    this.dataJobs.getJobs().subscribe(
      jobs => {
        this.jobs = jobs;
      }
    );
  }

  onSubmit(jobForm:any){
    this.jobType.name = this.jobTypeName;
    this.dataJobs.addJob(this.jobType).subscribe(
      data => {
        let jobAdd:JobType = data;
        this.jobs.push(jobAdd);
        this.submit.emit(jobAdd);
      }
    );
    jobForm.resetForm();
  }

  onDelete(job:JobType){
    this.jobs = this.jobs.filter(
      jobs => jobs.id !== job.id  
    );
    this.delete.emit(job);
  }

  onClose(jobForm:any){
    this.jobTypeName = "";
    jobForm.resetForm();
  }

}
