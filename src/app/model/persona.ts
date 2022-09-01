export class persona {
    id? : number;
    nombreApellido : string;
    cargo : string;
    lugarNacimiento : string;
    fechaNacimiento : string;
    img : string;

    constructor( nombreApellido : string, cargo : string, lugarNacimiento : string, img : string, fechaNacimiento : string) {         
        this.nombreApellido = nombreApellido;
        this.cargo = cargo;
        this.lugarNacimiento = lugarNacimiento;
        this.fechaNacimiento = fechaNacimiento;
        this.img = img;
    }
}
