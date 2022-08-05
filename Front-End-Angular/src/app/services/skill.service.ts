import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Skill } from '../model/skillEntity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private apiUrl = environment.api + "skill";

  constructor(
    private http:HttpClient
  ) { }

  getSkills():Observable<Skill[]>{
    const url = `${this.apiUrl}/person/1`;
    return this.http.get<Skill[]>(url);
  }

  updateSkill( skill:Skill ):Observable<Skill>{
    const url = `${this.apiUrl}/${skill.id}`;
    return this.http.put<Skill>(url,skill);
  }

  addSkill( skill:Skill ):Observable<Skill>{
    const url = `${this.apiUrl}/1`;
    return this.http.post<Skill>(url,skill);
  }

  deleteSkill( skill:Skill ):Observable<Skill>{
    const url = `${this.apiUrl}/${skill.id}`;
    return this.http.delete<Skill>(url);
  }

}
