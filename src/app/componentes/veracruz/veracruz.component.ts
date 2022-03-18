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
    swalLoading();
    this.databaseService.getRegisterCotizadorVr(data[0], superior).subscribe((res:any) => {
      this.registers = res;
      if(this.registers.length!=0){
        closeAlert();
      }
    },(error:any)=> {
      console.log(error)
    });
  }


  enviarDatos(id:any, link:any, comentarios:any, indice:any){
    if(link && comentarios != undefined){
      const username = this.result.username;
        this.databaseService.putDatosVr(id, link, comentarios, username).subscribe((res:any) => {
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
