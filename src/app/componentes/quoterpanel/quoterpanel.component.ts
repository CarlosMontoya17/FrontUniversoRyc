import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DatabaseService } from 'src/app/servicios/database/database.service';
import { Router } from "@angular/router";
import { InitializerService } from 'src/app/servicios/initializer/initializer.service';
declare function swalLoading(): any;
declare function closeAlert(): any;
declare function swalError(mensaje: any): any;
declare function swalMixin(icon: any, mensaje: any): any;

@Component({
  selector: 'app-quoterpanel',
  templateUrl: './quoterpanel.component.html',
  styleUrls: ['./quoterpanel.component.css']
})
export class QuoterpanelComponent implements OnInit {
  result: any = [];

  business: any = [];
  municipios: any = [];

  filterEnterprise: String = "";
  filterMunicipality: String = "";
  filterSalary: number = 0;

  empresaSelect: String = "Empresa";
  municipioSelect: String = "Municipio";
  salarySelect: any = "Salario";


  state: Boolean = false;
  index: Boolean = false;

  ready: boolean = false;


  total: any;
  count: any;
  timeAprox: any;
  prefix: any;


  constructor(private databaseService: DatabaseService, private initializerService: InitializerService, private router: Router) { }

  ngOnInit(): void {
    swalLoading();
    this.init();
    this.getDataMunicipality();
    this.getDataEnterprises();
  }

  async init() {
    var result = await this.initializerService.init();
    if (result != null) {
      this.result = result;
    }
  }

  cancelOperation() {
    this.router.navigate(['/quoter']);
  }


  getDataMunicipality() {
    this.databaseService.getMunicipality().subscribe((dat: any) => {
      this.municipios = dat;
    });
  }

  getDataEnterprises() {

    this.databaseService.getEnterprises().subscribe((dat: any) => {
      this.business = dat;
      closeAlert();
    });
  }

  calculateData() {
    if (this.municipioSelect != "Municipio" && this.empresaSelect != "Empresa" && this.salarySelect != "Salario") {
      this.ready = true;
      swalLoading();
      this.databaseService.getDataPriory(this.municipioSelect, this.empresaSelect, this.salarySelect).subscribe((dat: any) => {
        this.count = dat.count;
        this.timeAprox = Math.round(this.count * 0.18);
        if (this.timeAprox > 0 && this.timeAprox < 60) {
          this.prefix = "min";
          
        }
        else if (this.timeAprox > 60 && this.timeAprox < 1440) {
          this.prefix = "hrs";
          this.timeAprox = Math.round(this.timeAprox/60);
        }
        else if (this.timeAprox > 1440 && this.timeAprox < 10080) {
          this.prefix = "dias";
          this.timeAprox = Math.round(this.timeAprox/1440);
        }
        else if (this.timeAprox > 10080 && this.timeAprox < 40320) {
          this.prefix = "sem";
          this.timeAprox = Math.round(this.timeAprox/10080);
        }

        closeAlert();
      });
    }

  }
 
  sendRequest(){
    swalLoading();
    this.databaseService.putPriory(this.result.username, this.municipioSelect, this.empresaSelect, this.salarySelect).subscribe((dat: any) =>{
      closeAlert();
      swalMixin("success", "Solicitud enviada")
    }, (error:any) =>{
      closeAlert();
      swalMixin("error", "Error de envio")
    })
    

  }


  filterByOne() {

    if (this.filterMunicipality.length >= 3) {
      swalLoading();
      this.state = true;
      closeAlert();
    }
  }

  filterByTwo() {

    if (this.filterEnterprise.length >= 3) {
      swalLoading();
      this.index = true;
      closeAlert();
    }

  }

  setMunicipality(select: any) {
    this.municipioSelect = select;
  }

  setEnterprise(select: any) {
    this.empresaSelect = select;
  }

  setSalary() {
    if (this.filterSalary >= -1 && this.filterSalary != null) {
      this.salarySelect = this.filterSalary;
    }
    else {
      swalError('Agrega mínimo un digito');
    }
  }

  back() {
    this.state = false;
    this.index = false;
  }










}
