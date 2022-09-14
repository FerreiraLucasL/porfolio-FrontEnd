import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/services/persona.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public persona: persona | undefined;
  public editPersona: persona | undefined;
  constructor(private personaService: PersonaService) {}


ngOnInit(): void {
  this.getPersona();     
  }
  
public getPersona(): void {
  this.personaService.getPersona().subscribe({
    next: (response: persona) => {  
      this.persona = response;
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message); 
    }
  })
}
}
