import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Person } from '../model/personEntity';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(
    private http:HttpClient
  ) { }

  getData():Observable<any>{
    return this.http.get("../assets/data/data.json");
  }

  // getPerson():Observable<Person>{
  //   return this.http.get<Person>("http://localhost:8080/person");
  // }

}
