import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Education } from '../model/educationEntity';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private apiUrl = "http://localhost:8080/education";

  constructor(
    private http:HttpClient
  ) { }

  getEducation():Observable<Education[]>{
    const url = `${this.apiUrl}/person/1`;
    return this.http.get<Education[]>(url);
  }

  updateEducation( edu:Education ):Observable<Education>{
    const url = `${this.apiUrl}/${edu.id}`;
    return this.http.put<Education>(url,edu);
  }

  addEducation( edu:Education ):Observable<Education>{
    const url = `${this.apiUrl}/1`;
    return this.http.post<Education>(url,edu);
  }

  deleteEducation( edu:Education ):Observable<Education>{
    const url = `${this.apiUrl}/${edu.id}`;
    return this.http.delete<Education>(url);
  }

}
