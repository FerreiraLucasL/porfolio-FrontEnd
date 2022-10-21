import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Education } from '../model/education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getEducations(): Observable<Education[]>{  
    return this.http.get<Education[]>(`${this.apiServerUrl}educacion/get`);    
  }
  public createEducation(edu: Education): Observable<Education>{
    return this.http.post<Education>(`${this.apiServerUrl}educacion/create`,edu)
  }
  public editEducation(edu: Education): Observable<Education>{
    return this.http.put<Education>(`${this.apiServerUrl}educacion/edit/`,edu)    
  }
  public deleteEducation(eduId:number): Observable<Education>{
    return this.http.delete<Education>(`${this.apiServerUrl}educacion/delete/${eduId}`);
  }

}
