import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { InitializerService } from  'src/app/servicios/initializer/initializer.service';

@Component({
  selector: 'app-vista-capturista',
  templateUrl: './vista-capturista.component.html',
  styleUrls: ['./vista-capturista.component.css']
})
export class VistaCapturistaComponent implements OnInit {
  result:any = [];
  tiempoActual:any;
  componente:any= 'home';
  constructor(private  router:  Router, private initializerService : InitializerService) { }

  ngOnInit(): void {
    this.init();
  }
  async init(){
    var result = await this.initializerService.init();
    if(result!=null){
      this.result = result;
      this.welcome();
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

  cambiarsubComponente(vista:any) {
    this.componente=vista;
  }

}
