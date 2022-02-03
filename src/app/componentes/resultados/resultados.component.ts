import { Component, OnInit } from '@angular/core';
import { InitializerService } from 'src/app/servicios/initializer/initializer.service';
import { DatabaseService } from 'src/app/servicios/database/database.service';
declare function swalLoading(): any;
declare function closeAlert(): any;
declare function swalOk(mensaje:any): any;
declare function swalError(mensaje:any): any;

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  resultados: any = [];
  resultDirecciones: any = [];
  registers:any = [];
  p: number = 1;

  resultadosVr:any = [];
  resultDireccionesVr:any = [];
  registersVr:any = [];

  resultadosCh:any = [];
  resultDireccionesCh:any = [];
  registersCh:any = [];


  constructor(private initializerService: InitializerService, private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.getDatosResultados();
    this.getDatosResultadosVr();

  }

  getDatosResultados() {
    this.databaseService.getResultados().subscribe((res: any) => {
      this.resultados = res;
    });
  }

  getDatosResultadosVr() {
    this.databaseService.getResultadosVeracruz().subscribe((res: any) => {
      this.resultadosVr = res;
    });
  }

  getDatosResultadosCh() {
    this.databaseService.getProspectos().subscribe((res: any) => {
      this.resultadosCh = res;
    });
  }

  readOnlyNl(){
    for(let i=0; i<this.registers.length; i++){
      this.databaseService.getDireccionNuevoleon(this.registers[i].curp).subscribe((res:any) => {
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
  
}
