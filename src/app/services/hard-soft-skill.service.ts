import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HardSoftSkill } from '../model/hard-soft-skill';

@Injectable({
  providedIn: 'root'
})
export class HardSoftSkillService {
  private apiServerUrl=environment.apiBaseUrl;


  constructor(private http: HttpClient) { }

  public getSkills(): Observable<HardSoftSkill[]>{  
    return this.http.get<HardSoftSkill[]>(`${this.apiServerUrl}hardsoftskill/get`);
  }

  
}
