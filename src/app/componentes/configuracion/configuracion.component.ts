import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from 'src/app/servicios/database/database.service';
import { AgGridAngular } from 'ag-grid-angular';
declare function swalLoading():any;
declare function closeAlert():any;
declare function getArray():any;


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

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
  overlayLoadingTemplate:any;
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
        headerName: 'Subdelegacion',
      },
      {
        headerName: 'Delegacion de origen',
      },
      {
        headerName: 'UMF',
      },
      {
        headerName: 'Registro patronal',
      },
      {
        headerName: 'NSS',
        field: 'nss',
      },
      {
        headerName: 'Nombre',
        field: 'nombre',
        sortable: true,
      },
      {
        headerName: 'Fecha de nacimiento',
        field: 'fechaNacimiento',
        filter: 'agDateColumnFilter',
        filterParams: filterParams,
      },
      {
        headerName: 'Saldo base',
      },
      {
        headerName: 'CURP',
      },
      {
        headerName: 'Registro patronal',
      },
      {
        headerName: 'RFC Homoclave',
      },
      {
        headerName: 'Nombre del patron',
      },
      {
        headerName: 'Domicilio del patron',
      },
      {
        headerName: 'Localidad del patron',
      },
      {
        headerName: 'C.P',
      },
      {
        headerName: 'Giro',
      },
      {
        headerName: 'Asignado para cotizar',
      },
      {
        headerName: 'Cotizacion mejoravit',
      },
      {
        headerName: 'Costo por la originacion',
      },
      {
        headerName: 'Costo por canje',
      },
      {
        headerName: 'Efectivo',
      },
      {
        headerName: 'Cantidad de puntos',
      },
      {
        headerName: 'Mes de Tramite de credito',
      },
      {
        headerName: 'Año de Tramite de credito',
      },
      {
        headerName: 'Monto Linea 4',
        field: 'montolinea4',
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
        sortable: true,
      },
      {
        headerName: 'Costo Winners',
      },
      {
        headerName: 'Monto Linea 2',
        field: 'montolinea2',
        type: 'numberColumn',
        filter: 'agNumberColumnFilter',
        sortable: true,
      },
      {
        headerName: 'Desc. Mensual',
        field: 'descMensual',
        type: 'numberColumn',
        filter: 'agNumberColumnFilter',
        sortable: true,
      },
      {
        headerName: 'RFC',
      },
      {
        headerName: '# Asignado en base',
      },
      {
        headerName: 'Fase de cartas',
      },
      {
        headerName: 'Para que producto es considerado',
      },
      {
        headerName: 'Excepcion',
        field: 'excepcion',
      },
    ];
    this.defaultColDef = {
      width: 200,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      resizable: true,
      editable: true,
    };
    this.overlayLoadingTemplate ='<span class="ag-overlay-loading-center">Por favor espere, estamos cargando los datos</span>';
    this.columnTypes = {
      numberColumn: {
        width: 130,
        filter: 'agNumberColumnFilter',
      },
      nonEditableColumn: { editable: false },
    };
  }

  ngOnInit(): void {

  }

  init() {
    this.databaseService.getProspectosByCond('si').subscribe((res: any) => {
      this.prospectos = res;
    }, (error: any) => {
      console.log(error);
    });
  }

  onBtExport() {
    this.gridApi.exportDataAsCsv();
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    fetch('https://gruporyc.com.mx:8080/api/prospectos/findAll/')
    .then(result => result.json())
    .then(rowData => this.rowData = rowData);
  }

  // getSelectedRows(){
  //   const selectedNodes = this.gridApi.api.getSelectedNodes();
  //   const selectedData = selectedNodes.map(node => node.data);
  //   const selectedDataStringPresentation = selectedData.map((node: { make: any; }) => node.make + '' + node.model).join(",");
  // }

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
        fetch('https://gruporyc.com.mx:8080/api/prospectos/findAll/')
        .then(result => result.json())
        .then(rowData => this.rowData = rowData);
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.showLoadingOverlay();
        break;
      }
    }
  }
}



