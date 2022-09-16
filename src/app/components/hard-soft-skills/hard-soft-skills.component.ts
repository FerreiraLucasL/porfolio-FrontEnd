import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HardSoftSkill } from 'src/app/model/hard-soft-skill';
import { HardSoftSkillService } from 'src/app/services/hard-soft-skill.service';

import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-hard-soft-skills',
  templateUrl: './hard-soft-skills.component.html',
  styleUrls: ['./hard-soft-skills.component.css']
})
export class HardSoftSkillsComponent implements OnInit {
  public skills:HardSoftSkill[]=[];
  constructor(private skillsServ: HardSoftSkillService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.getSkills();
  }
  public getSkills(): void {
    this.skillsServ.getSkills().subscribe({
      next:(Response:HardSoftSkill[]) => {
        this.skills=Response;
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
    })
  }

}
