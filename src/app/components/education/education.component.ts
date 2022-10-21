import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/model/education';
import { EducationService } from 'src/app/services/education.service';
import { TokenService } from 'src/app/services/token.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})

export class EducationComponent implements OnInit {
  isLogged = false;
  public educations:Education[]=[]; 
  closeResult: string = '';    
  editForm!: FormGroup;
  deleteId!: number;
  eduBorrarNombre!: string;

  constructor(
    private eduServ:EducationService,
    private tokenService:TokenService,     
    private modalService: NgbModal,
    private fb: FormBuilder    
  ) { }

  ngOnInit(): void {    
    this.getEducations();  
  //funcion para saber si está logueado y mostrar los botones editar, borrar y agregar
  if (this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  
  this.editForm = this.fb.group({
    id: 0,
    educacionNombre: [''],
    educacionLugar: [''],
    educacionTiempo: [''],
    educacionAnios: ['']
  } );
}
  //obtener datos del backEnd

  public getEducations(): void {
    this.eduServ.getEducations().subscribe({
      next:(Response:Education[]) => {
        this.educations=Response;
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
    })
  }


  // crud modal

  //funcion abrir modalAgregar
open(content: any) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
}
  //funcion submit del modalAgregar
  public onSubmitAgregar(agregar: NgForm): void {
    this.eduServ.createEducation(agregar.value).subscribe({
      next: (response: Education) => {
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
    this.modalService.dismissAll();
  }
  //funcion cerrar el modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  //funcion abrir modalEditar
openEdit(targetModal: any, edu: Education) {
  this.modalService.open(targetModal, {
    backdrop: 'static'
  });
  this.editForm.patchValue({
    id: edu.id,
    educacionNombre: edu.educacionNombre,
    educacionLugar: edu.educacionLugar,
    educacionTiempo: edu.educacionTiempo,
    educacionAnios: edu.educacionAnios,
  });
}
//funcion guardar cambios modalEditar
onSave() {  
  console.log(this.editForm.value);  
  this.eduServ.editEducation(this.editForm.value).subscribe({
    next: (response: Education) => {
      this.ngOnInit();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    },
  });
  this.modalService.dismissAll();
}
//funcion borrar
openDelete(targetModal:any, edu: Education) {  
  this.deleteId = edu.id;
  this.eduBorrarNombre = edu.educacionNombre;
  this.modalService.open(targetModal, {
    backdrop: 'static',    
  });
}
onDelete() {
  this.eduServ.deleteEducation(this.deleteId).subscribe({
   next: (response: Education) => {
     this.ngOnInit();
   },
   error: (error: HttpErrorResponse) => {
     alert(error.message);
   },
 });
 this.modalService.dismissAll();
}


}