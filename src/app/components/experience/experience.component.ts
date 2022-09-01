import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/model/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  exp: Experience[] = [];

  constructor(private expServ : ExperienceService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.cargarExperiencias();
  }


  cargarExperiencias(): void {
    this.expServ.getExperiencia().subscribe(data => {this.exp = data;})  
    console.log(this.exp);
  }

}

