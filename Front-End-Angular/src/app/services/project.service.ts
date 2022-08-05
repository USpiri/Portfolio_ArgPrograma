import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Project } from '../model/projectEntity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = environment.api + "project";

  constructor(
    private http:HttpClient
  ) { }

  getProjects():Observable<Project[]>{
    const url = `${this.apiUrl}/person/1`;
    return this.http.get<Project[]>(url);
  }

  updateProject( project:Project ):Observable<Project>{
    const url = `${this.apiUrl}/${project.id}`;
    return this.http.put<Project>(url,project);
  }

  addProject( project:Project ):Observable<Project>{
    const url = `${this.apiUrl}/1`;
    return this.http.post<Project>(url,project);
  }

  deleteProject( project:Project ):Observable<Project>{
    const url = `${this.apiUrl}/${project.id}`;
    return this.http.delete<Project>(url);
  }

  updateImage( file:FormData, project:Project ):Observable<Project>{
    const url = `${this.apiUrl}/${project.id}/image`;
    return this.http.put<Project>(url,file);
  }

}
