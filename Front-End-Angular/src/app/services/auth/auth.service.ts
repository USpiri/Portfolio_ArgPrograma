import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/model/LoginRequest';


const AUTH_API = "http://localhost:8080/auth";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  login( user:LoginRequest ):Observable<any>{
    return this.http.post(AUTH_API+"/login",user,httpOptions);
  }

}
