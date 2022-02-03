import { Component, OnInit, ViewChild } from '@angular/core';
import {  DatabaseService } from  'src/app/servicios/database/database.service';
import { AgGridAngular } from 'ag-grid-angular';


declare function swalLoading():any;
declare function closeAlert():any;
declare function getArray():any;
@Component({
  selector: 'app-prospectos',
  templateUrl: './prospectos.component.html',
  styleUrls: ['./prospectos.component.css']
})
export class ProspectosComponent implements  OnInit {
  p: number = 1;

  @ViewChild("agGrid", {static:false}) agGrid: AgGridAngular | undefined;
  localeText:any;
  prospectos: any = [];
  gridApi:any;
  gridColumnApi:any;
  columnDefs:any;
  defaultColDef:any;
  defaultColGroupDef:any;
  columnTypes:any;
  params:any;
  sortingOrder:any;
  rowData = [];
  constructor(private databaseService: DatabaseService) {
    let AG_GRID_LOCALE_EN = getArray();
    this.localeText = AG_GRID_LOCALE_EN;
    let filterParams = {
      comparator: function (filterLocalDateAtMidnight:any, cellValue:any) {
        let dateAsString = cellValue;
        if (dateAsString == null) return -1;
        let dateParts = dateAsString.split('/');
        let cellDate = new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0])
        );
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
          return 0;
        }
        if (cellDate < filterLocalDateAtMidnight) {
          return -1;
        }
        if (cellDate > filterLocalDateAtMidnight) {
          return 1;
        }
        return 0;
      },
      browserDatePicker: true,
    };
      this.columnDefs = [
        {
          headerName: 'Nombre',
          field: 'nombre',
          sortable: true,
        },
      {
        headerName: 'NSS',
        field: 'nss',
      },
      {
        headerName: 'Fecha de nacimiento',
        field: 'fechaNacimiento',
        filter: 'agDateColumnFilter',
        filterParams: filterParams,
      },
      {
        headerName: 'Monto Linea 4',
        field: 'montolinea4',
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
        sortable: true,
      },
      {
        headerName: 'Monto Linea 2',
        field: 'montolinea2',
        type: 'numberColumn',
        filter: 'agNumberColumnFilter',
        sortable: true,
      },
      {
        headerName: 'Excepcion',
        field: 'excepcion',
      },
    ];
    this.defaultColDef = {
      width: 250,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      resizable: true,
    };
    this.columnTypes = {
      numberColumn: {
        width: 130,
        filter: 'agNumberColumnFilter',
      },
      nonEditableColumn: { editable: false },
    };
   }

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.databaseService.getProspectosByCond('si').subscribe((res:any) => {
      this.prospectos = res;
      closeAlert();
    },(error:any)=> {
      console.log(error);
    });
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    fetch('https://gruporyc.com.mx:8080/api/prospectos/findAll/')
    .then(result => result.json())
    .then(rowData => this.rowData = rowData);
  }
  externalFilterChanged(params:any) {
    switch(params){
      case 'siperono':{
        this.databaseService.getProspectosByCond('siperono').subscribe((res:any) => {
          this.prospectos = res;
          this.rowData =this.prospectos;
          },(error:any)=> {
            console.log(error);
          });
          this.gridApi = params.api;
          this.gridColumnApi = params.columnApi;
          break;
      }
      case 'si':{
        this.databaseService.getProspectosByCond('si').subscribe((res:any) => {
          this.prospectos = res;
          this.rowData =this.prospectos;
          },(error:any)=> {
            console.log(error);
          });
          this.gridApi = params.api;
          this.gridColumnApi = params.columnApi;
          break;
      }
      case 'no':{
        this.databaseService.getProspectosByCond('no').subscribe((res:any) => {
          this.prospectos = res;
          this.rowData =this.prospectos;
          },(error:any)=> {
            console.log(error);
          });
          this.gridApi = params.api;
          this.gridColumnApi = params.columnApi;
          break;
      }
      case 'todos':{
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        fetch('https://gruporyc.com.mx:8080/api/prospectos/findAll/')
        .then(result => result.json())
        .then(rowData => this.rowData = rowData);
        break;
      }
    }
  }

}
