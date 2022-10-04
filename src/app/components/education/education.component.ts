import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Education } from 'src/app/model/education';
import { EducationService } from 'src/app/services/education.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  isLogged = false;
  public educations:Education[]=[]; 
  public editEducation:Education | undefined;
  public deleteEducation:Education | undefined;
  
  constructor(private educationService:EducationService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.getEducations();  
    if (this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }
  public getEducations(): void {
    this.educationService.getEducations().subscribe({
      next:(Response:Education[]) => {
        this.educations=Response;
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
    })
  }
  // crud modal
  
  public onOpenModal(mode:string, education?: Education):void {
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-target', '#addEducationModal');
    }else if(mode==='delete'){
      this.deleteEducation=education;
      button.setAttribute('data-target', '#deleteEducationModal');
    }else if(mode==='edit'){
      this.editEducation=education;
      button.setAttribute('data-target', '#editEducationModal');
    }
    container?.appendChild(button);
    button.click(); 
  }

  public onAddEducation(addForm: NgForm){
    document.getElementById('add-education-form')?.click();
    this.educationService.addEducation(addForm.value).subscribe({
      next: (response:Education) => {
        this.getEducations();
        addForm.resetForm();
      },
      error: (error:HttpErrorResponse) =>{
        alert(error.message);
        addForm.reset;
      }
    })
  }

  public onEditEducation(education:Education){
    this.editEducation=education;
    document.getElementById('add-education-form')?.click();
    this.educationService.editEducation(education).subscribe({
      next: (response:Education) => {
        console.log(response);
        this.getEducations();
      },
      error: (error:HttpErrorResponse) =>{
        alert(error.message);       
      }
    })
  }

  public onDeleteEducation(idEdu: number): void {
    this.educationService.deleteEducation(idEdu).subscribe({
      next: (response:void) => {
        this.getEducations();
      },
      error: (error:HttpErrorResponse) =>{
        alert(error.message);       
      }
    })
  }

}
