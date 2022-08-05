import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Email } from '../model/emailEntity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = environment.api;

  constructor(
    private http:HttpClient
  ) { }

  sendEmail( email:Email ):Observable<any>{
    const url = `${this.apiUrl}1/send-email`;
    return this.http.post(url,email);
  }

}
