import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Image } from '../model/imageEntity';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = "http://localhost:8080/image";

  constructor(
    private http:HttpClient
  ) { }

  getImages():Observable<Image>{
    const url = `${this.apiUrl}/person/1`;
    return this.http.get<Image>(url);
  }

  updateImages( file:FormData, img:Image ):Observable<Image>{
    const url = `${this.apiUrl}/${img.id}`;
    return this.http.put<Image>(url,file);
  }

  updateHeader( file:FormData, img:Image ):Observable<Image>{
    const url = `${this.apiUrl}/${img.id}/header`;
    return this.http.put<Image>(url,file);
  }

  updateAbout( file:FormData, img:Image ):Observable<Image>{
    const url = `${this.apiUrl}/${img.id}/about`;
    return this.http.put<Image>(url,file);
  }

  addImages( img:Image ):Observable<Image>{
    const url = `${this.apiUrl}/1`;
    return this.http.post<Image>(url,img);
  }

}
