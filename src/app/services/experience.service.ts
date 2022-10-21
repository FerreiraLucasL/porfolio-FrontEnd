import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experience } from '../model/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiServerUrl}experiencia/get`);
  }
  public createExperience(exp:Experience): Observable<Experience> {
    return this.http.post<Experience>(`${this.apiServerUrl}experiencia/create`,exp);    
  }  

  public editExperience(exp:Experience): Observable<Experience> {
    return this.http.put<Experience>(`${this.apiServerUrl}experiencia/edit/`, exp);
  }

  public deleteExperience(expId:number): Observable<Experience>{
    return this.http.delete<Experience>(`${this.apiServerUrl}experiencia/delete/${expId}`);
  }

}