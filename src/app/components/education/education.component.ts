import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/model/education';
import { EducationService } from 'src/app/services/education.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  public educations:Education[]=[]; 
  
  constructor(private expServ:EducationService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.getEducations();  
  }
  public getEducations(): void {
    this.expServ.getEducations().subscribe({
      next:(Response:Education[]) => {
        this.educations=Response;
        console.log(JSON.stringify(this.educations));
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
    })
  }

}
