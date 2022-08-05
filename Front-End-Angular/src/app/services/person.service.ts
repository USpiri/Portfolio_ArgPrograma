import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Person } from '../model/personEntity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private apiUrl = environment.api + "person";

  constructor(
    private http:HttpClient
  ) { }

  getPerson():Observable<Person>{
    const url = `${this.apiUrl}/1`;
    return this.http.get<Person>(url);
  }

  updatePerson( per:Person ):Observable<Person>{
    const url = `${this.apiUrl}/${per.id}`;
    return this.http.put<Person>(url,per);
  }

  addPerson( per:Person ):Observable<Person>{
    const url = `${this.apiUrl}`;
    return this.http.post<Person>(url,per);
  }

}
