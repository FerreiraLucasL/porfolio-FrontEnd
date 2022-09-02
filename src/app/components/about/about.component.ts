import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/services/persona.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  persona : persona = new persona("","","","","");
  pers: any;
  constructor(public personaService:PersonaService) {}


ngOnInit(): void {

    this.personaService.getPersona().subscribe(data => {
      this.pers = data;
      console.log(this.pers);
      this.persona = this.pers;
      console.log(this.persona);
    });  
   
  }
  

}
