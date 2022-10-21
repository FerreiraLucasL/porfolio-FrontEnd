import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/model/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { TokenService } from 'src/app/services/token.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})

export class ExperienceComponent implements OnInit {
  isLogged = false;
  public experiences: Experience[] = [];
  closeResult: string = '';    
  editForm!: FormGroup;
  deleteId!: number;
  expBorrarNombre!: string;

constructor(
  private expServ: ExperienceService,
  private tokenService: TokenService,
  private modalService: NgbModal,
  private fb: FormBuilder
) { }

ngOnInit(): void {
  this.getExperiences();
  //funcion para saber si está logueado y mostrar los botones editar, borrar y agregar
  if(this.tokenService.getToken()) {
    this.isLogged = true;
  } else {
    this.isLogged = false;
  }
  this.editForm = this.fb.group({
    id: 0,
    experienciaNombre: [''],
    experienciaLugar: [''],
    experienciaTiempo: [''],
    experienciaAnios: ['']
  } );
}

  //obtener datos del backEnd
  public getExperiences(): void {
  this.expServ.getExperiences().subscribe({
    next: (Response: Experience[]) => {
      this.experiences = Response;
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    },
  });
}

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
  this.expServ.createExperience(agregar.value).subscribe({
    next: (response: Experience) => {
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
openEdit(targetModal: any, exp: Experience) {
  this.modalService.open(targetModal, {
    backdrop: 'static'
  });
  this.editForm.patchValue({
    id: exp.id,
    experienciaNombre: exp.experienciaNombre,
    experienciaLugar: exp.experienciaLugar,
    experienciaTiempo: exp.experienciaTiempo,
    experienciaAnios: exp.experienciaAnios,
  });
}
//funcion guardar cambios modalEditar
onSave() {  
  console.log(this.editForm.value);  
  this.expServ.editExperience(this.editForm.value).subscribe({
    next: (response: Experience) => {
      this.ngOnInit();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    },
  });
  this.modalService.dismissAll();
}


//funcion borrar
openDelete(targetModal:any, exp: Experience) {  
  this.deleteId = exp.id;
  this.expBorrarNombre = exp.experienciaNombre;
  this.modalService.open(targetModal, {
    backdrop: 'static',    
  });
}
onDelete() {
   this.expServ.deleteExperience(this.deleteId).subscribe({
    next: (response: Experience) => {
      this.ngOnInit();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    },
  });
  this.modalService.dismissAll();
}


}
