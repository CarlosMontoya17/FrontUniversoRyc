import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { InitializerService } from  'src/app/servicios/initializer/initializer.service';
declare function reload():any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  tiempoActual:any;
  componente:any = 'inicio';
  result:any = [];
  usuario:any = 'Usuario';
  constructor(private  router:  Router, private initializerService : InitializerService) { }

  ngOnInit(): void {
    this.init();
  }

  cambiarComponente(vista:any) {
    this.componente=vista;
  }

  async init(){
    var result = await this.initializerService.init();
    if(result!=null){
      this.result = result;
      this.welcome();
      reload();
    }else{
      this.router.navigate(['/login']);
    }
  }

  welcome(){
    var today = new Date();
    var curHr = today.getHours();
    if (curHr < 12) {
      this.tiempoActual = 'Buenos días';
    }else if (curHr < 18) {
      this.tiempoActual = 'Buenas tardes';
    }else {
      this.tiempoActual = 'Buenas noches';
    }
  }
}
