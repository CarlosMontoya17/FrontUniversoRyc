import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { InitializerService } from  'src/app/servicios/initializer/initializer.service';
import { DatabaseService } from 'src/app/servicios/database/database.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  result:any = [];
  url = 'hola';
  constructor(private  router:  Router, private initializerService : InitializerService, private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.init();
  }

  logout(){
  	localStorage.clear();
  	window.location.replace("/login");
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
