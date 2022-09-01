export class Experience {
    id? : number;
    expNombre : string;
    expLugar : string;
    expTiempo :  string;
    expAnios : string;  

    constructor(expNombre: string, expLugar: string, expTiempo: string, expAnios: string) {
        this.expNombre = expNombre;
        this.expLugar = expLugar;
        this.expTiempo = expTiempo;
        this.expAnios = expAnios;        
    }
}
