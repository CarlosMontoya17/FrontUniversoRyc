import { Component, OnInit } from '@angular/core';
import { InitializerService } from  'src/app/servicios/initializer/initializer.service';
import { DatabaseService } from 'src/app/servicios/database/database.service';
import { Router } from  "@angular/router";
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  result:any = [];

  constructor(private  router:  Router, private initializerService : InitializerService, private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.init();
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
