import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public persona: persona | undefined;
  public editPersona: persona | undefined;
  isLogged = false;
  editForm!: FormGroup;

  constructor(
    private personaService: PersonaService,
    private tokenService:TokenService,     
    private fb: FormBuilder,    
    private modalService: NgbModal
    ) {}


ngOnInit(): void {
  this.getPersona();     
  if (this.tokenService.getToken()){
    this.isLogged = true;
  }else{
    this.isLogged = false;
  }

  this.editForm = this.fb.group({
    id: 0,
    nombreApellido: [''],
    cargo: [''],
    lugarNacimiento: [''],
    fechaNacimiento: [''],
    img:[''],
    acerca:[''],
    banner:[''],
  } );
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

  //funcion abrir modalEditar
openEdit(targetModal: any, pers: persona) {
  this.modalService.open(targetModal, {
    backdrop: 'static'
  });
  this.editForm.patchValue({
    id: pers.id,
    nombreApellido: pers.nombreApellido,
    cargo: pers.cargo,
    lugarNacimiento: pers.lugarNacimiento,
    fechaNacimiento: pers.fechaNacimiento,
    img: pers.img,
    acerca: pers.acerca,
    banner:pers.banner,
  });
}

//funcion guardar cambios modalEditar
onSave() {  
  console.log(this.editForm.value);  
  this.personaService.editPersona(this.editForm.value).subscribe({
    next: (response: persona) => {
      this.ngOnInit();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    },
  });
  this.modalService.dismissAll();
}

}