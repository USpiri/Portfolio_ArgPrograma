import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Social } from '../model/socialMediaEntity';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  private apiUrl = "http://localhost:8080/social";

  constructor(
    private http:HttpClient
  ) { }

  getLinks():Observable<Social>{
    const url = `${this.apiUrl}/person/1`;
    return this.http.get<Social>(url);
  }

  updateLinks( soc:Social ):Observable<Social>{
    const url = `${this.apiUrl}/${soc.id}`;
    return this.http.put<Social>(url,soc);
  }

  addLinks( soc:Social ):Observable<Social>{
    const url = `${this.apiUrl}/1`;
    return this.http.post<Social>(url,soc);
  }

}
