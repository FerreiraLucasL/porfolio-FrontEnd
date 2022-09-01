
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experience } from '../model/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
expUrl = 'http://localhost:8080/experiencia/';
  constructor(private http: HttpClient) { }

  public getExperiencia(): Observable<Experience[]>{  
    return this.http.get<Experience[]>(this.expUrl+ 'get');
  }



}
