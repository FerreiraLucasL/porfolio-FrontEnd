import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
urlPersona = 'http://localhost:8080/persona/';
  constructor(private http: HttpClient) { }
  public getPersona(): Observable<any>{
    return this.http.get<any>(this.urlPersona+'get');        
  }
}
