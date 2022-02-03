import { Component, OnInit } from '@angular/core';
import { UsersService } from  'src/app/servicios/users/users.service';
import { DatabaseService } from  'src/app/servicios/database/database.service';
import { InitializerService } from  'src/app/servicios/initializer/initializer.service';
import { Router } from  "@angular/router";
declare function swalOk(mensaje:any): any;
@Component({
  selector: 'app-capturistas',
  templateUrl: './capturistas.component.html',
  styleUrls: ['./capturistas.component.css']
})
export class CapturistasComponent implements OnInit {
  result:any = [];
  componente: any = 'asignacion';
  bd="IMSS 2018";
  capturistaSeleccionado="Seleccionar";
  cantidadRegistros:any='';
  dataCapturistas: any = [];
  rendCapturista: any = [];
  prospectos: any = [];
  currentIndex:any = {
    id: '',
    name: '',
    index: '',
  };

  constructor(private  router:  Router, private usersService: UsersService, private databaseService: DatabaseService, private initializerService : InitializerService) { }

  ngOnInit(): void {
    //this.getCapturistas();
    this.init();
  }

  cambiarsubComponente(vista:any) {
    this.componente=vista;
  }

  getRegistersDataPerCapturist(){
    /*if(this.capturistaSeleccionado != "Seleccionar"){
      this.databaseService.getRegisters(this.capturistaSeleccionado).subscribe(res => {
        this.rendCapturista = res;
    },
    error=> {
      console.log(error);
    });
    }*/
  }

  /*getCapturistas(){
    this.usersService.getCapturistas("capturista").subscribe(res => {
        this.dataCapturistas = res;
    },
    error=> {
      console.log(error);
    });
  }*/

  asignar(){
    /*if(this.capturistaSeleccionado!="Seleccionar"){
      switch(this.bd){
        case 'IMSS 2021':{
          this.databaseService.getDbIndex('IMSS 2021').subscribe(res => {
            this.currentIndex=res;
            var newIndex : number = parseInt(this.cantidadRegistros) + parseInt(this.currentIndex[0].index) + 1;
            this.databaseService.addRegister(this.capturistaSeleccionado, this.cantidadRegistros, this.currentIndex[0].index, (newIndex - 1));
            this.databaseService.updateDbIndex(this.currentIndex[0].id, newIndex);
          },
          error=> {
            console.log(error);
          });
          break;
        }
        case 'IMSS 2018':{
          this.databaseService.getDbIndex('IMSS 2018').subscribe(res => {
            this.currentIndex=res;
            var newIndex : number = parseInt(this.cantidadRegistros) + parseInt(this.currentIndex[0].index) + 1;
            this.databaseService.addRegister(this.capturistaSeleccionado, this.cantidadRegistros, this.currentIndex[0].index, (newIndex - 1));
            this.databaseService.updateDbIndex(this.currentIndex[0].id, newIndex);
          },
          error=> {
            console.log(error);
          });
          break;
        }
        case 'IMSS 2017':{
          this.databaseService.getDbIndex('IMSS 2017').subscribe(res => {
            this.currentIndex=res;
            var newIndex : number = parseInt(this.cantidadRegistros) + parseInt(this.currentIndex[0].index) + 1;
            this.databaseService.addRegister(this.capturistaSeleccionado, this.cantidadRegistros, this.currentIndex[0].index, (newIndex - 1));
            this.databaseService.updateDbIndex(this.currentIndex[0].id, newIndex);
          },
          error=> {
            console.log(error);
          });
          break;
        }
      }
    }
    swalOk("Correcto!");*/
  }

  async init(){
    var result = await this.initializerService.init();
    if(result!=null){
      this.result = result;
    }else{
      this.router.navigate(['/login']);
    }
  }
}
