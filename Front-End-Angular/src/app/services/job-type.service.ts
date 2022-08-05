import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { JobType } from '../model/jobTypeEntity';

@Injectable({
  providedIn: 'root'
})
export class JobTypeService {

  private apiUrl = "http://localhost:8080/jobtype";

  constructor(
    private http:HttpClient
  ) { }

  getJobs():Observable<JobType[]>{
    const url = `${this.apiUrl}`;
    return this.http.get<JobType[]>(url);
  }

  updateJob( job:JobType ):Observable<JobType>{
    const url = `${this.apiUrl}/${job.id}`;
    return this.http.put<JobType>(url,job);
  }

  addJob( job:JobType ):Observable<JobType>{
    const url = `${this.apiUrl}`;
    return this.http.post<JobType>(url,job);
  }

  deleteJob( job:JobType ):Observable<JobType>{
    const url = `${this.apiUrl}/${job.id}`;
    return this.http.delete<JobType>(url);
  }

}
