import { HttpErrorResponse } from '@angular/common/http';
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
  public experiences:Experience[]=[];

  constructor(private expServ:ExperienceService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.getExperiences();    
  }
  public getExperiences(): void {
    this.expServ.getExperiences().subscribe({
      next:(Response:Experience[]) => {
        this.experiences=Response;
        console.log(JSON.stringify(this.experiences));
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
    })
  }

}

