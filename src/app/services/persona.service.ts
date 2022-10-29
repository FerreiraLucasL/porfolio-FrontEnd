import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPersona(): Observable<persona>{
    return this.http.get<persona>(`${this.apiServerUrl}persona/get/1`);        
  }

  public editPersona(persona: persona): Observable<persona> {
    return this.http.put<persona>(`${this.apiServerUrl}persona/edit/`, persona);
  }

}
