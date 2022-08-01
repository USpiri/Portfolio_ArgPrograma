import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Experience } from '../model/experienceEntity';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private apiUrl = "http://localhost:8080/experience";

  constructor(
    private http:HttpClient
  ) { }

  getExperience():Observable<Experience[]>{
    const url = `${this.apiUrl}/person/1`;
    return this.http.get<Experience[]>(url);
  }

  updateExperience( exp:Experience ):Observable<Experience>{
    const url = `${this.apiUrl}/${exp.id}`;
    return this.http.put<Experience>(url,exp);
  }

  addExperience( exp:Experience ):Observable<Experience>{
    const url = `${this.apiUrl}/1`;
    return this.http.post<Experience>(url,exp);
  }

  deleteExperience( exp:Experience ):Observable<Experience>{
    const url = `${this.apiUrl}/${exp.id}`;
    return this.http.delete<Experience>(url);
  }

  updateImage( file:FormData, exp:Experience ):Observable<Experience>{
    const url = `${this.apiUrl}/${exp.id}/image`;
    return this.http.put<Experience>(url,file);
  }

}
