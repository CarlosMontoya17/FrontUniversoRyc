import { Component, OnInit } from '@angular/core';
import { InitializerService } from  'src/app/servicios/initializer/initializer.service';
import {  DatabaseService } from  'src/app/servicios/database/database.service';
declare function swalLoading(): any;
declare function closeAlert(): any;
declare function swalOk(mensaje:any): any;
declare function swalError(mensaje:any): any;
@Component({
  selector: 'app-veracruz',
  templateUrl: './veracruz.component.html',
  styleUrls: ['./veracruz.component.css']
})
export class VeracruzComponent implements OnInit {
  resultDirecciones:any = [];
  links:any= [];
  comentarios:any=[];
  result:any = [];
  registers:any = [];

  constructor(private initializerService : InitializerService, private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.init();
  }

  async init(){
    var result = await this.initializerService.init();
    if(result!=null){
      this.result = result;
      this.getRegisterCotizador();
    }
  }


  getRegisterCotizador(){
    var data = this.result.precalifData.split(",");
    var superior = data[1] - data[2];
    this.databaseService.getRegisterCotizadorVr(data[0], superior).subscribe((res:any) => {
      this.registers = res;
      if(this.registers.length!=0){
        swalLoading();
      }
      this.readOnlyNl();
    },(error:any)=> {
      console.log(error)
    });
  }

  readOnlyNl(){
    for(let i=0; i<this.registers.length; i++){
      this.databaseService.getDireccionVr(this.registers[i].curp).subscribe((res:any) => {
        if(res!=null){
          this.resultDirecciones[this.registers[i].id]= res.calle + " #"+ res.ext + ", " + res.cp.slice(3) + ", " + res.e + ", " + res.m;
        }else{
          this.resultDirecciones[this.registers[i].id]= "No se encuentra la dirección";
        }
        if(i==this.registers.length-1){
          closeAlert();
        }
      },(error:any)=> {
        if(i==this.registers.length-1){
          closeAlert();
        }
        this.resultDirecciones[this.registers[i].id]="No se encontro la direccion";
      });
    }
  }

  enviarDatos(id:any, link:any, comentarios:any, indice:any){
    if(link && comentarios != undefined){
        this.databaseService.putDatosVr(id, link, comentarios).subscribe((res:any) => {
       this.registers.splice(indice, 1);
       swalOk("Guardado correctamente");
    },(error:any)=> {
      console.log(error)
    });
    }else{
      swalError("Campos vacios");
    }
  }

}
