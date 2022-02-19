import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from 'src/app/servicios/database/database.service';
import { AgGridAngular } from 'ag-grid-angular';
declare function swalLoading():any;
declare function closeAlert():any;
declare function swalError(mensaje:any): any;
declare function getArray():any;

@Component({
  selector: 'app-table-ine-ch',
  templateUrl: './table-ine-ch.component.html',
  styleUrls: ['./table-ine-ch.component.css']
})
export class TableIneChComponent implements OnInit {

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
  searchBy: any;

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
        headerName: 'CVE',
        field: 'cve',
        sortable: false,
      },
      {
        headerName: 'Edad',
        field: 'edad',
        sortable: false,
      },
      {
        headerName: 'Nombre Completo',
        field: 'namefull',
        sortable: false,
      },
      {
        headerName: 'Nombre',
        field: 'nombre',
        sortable: false,
      },
      {
        headerName: 'Apellido Paterno',
        field: 'paterno',
        sortable: false,
      },
      {
        headerName: 'Apellido Materno',
        field: 'materno',
        sortable: false,
      },
      {
        headerName: 'F. Nacimiento',
        field: 'fecnac',
        sortable: false,
      },
      {
        headerName: 'Sexo',
        field: 'sexo',
        sortable: false,
      },
      {
        headerName: 'Calle',
        field: 'calle',
        sortable: false,
      },
      {
        headerName: 'Número Interior',
        field: 'int',
        sortable: false,
      },
      {
        headerName: 'Número Exterior',
        field: 'ext',
        sortable: false,
      },
      {
        headerName: 'Colonia',
        field: 'colonia',
        sortable: false,
      },
      {
        headerName: 'CP',
        field: 'cp',
        sortable: false,
      },
      {
        headerName: 'Entidad',
        field: 'nombreEntidad',
        sortable: false,
      },
      {
        headerName: 'D',
        field: 'd',
        sortable: false,
      },
      {
        headerName: 'Municipio',
        field: 'nombreMunicipio',
        sortable: false,
      },
      {
        headerName: 'S',
        field: 's',
        sortable: false,
      },
      {
        headerName: 'L',
        field: 'l',
        sortable: false,
      },
      {
        headerName: 'Mza',
        field: 'mza',
        sortable: false,
      },
      {
        headerName: 'Consec',
        field: 'consec',
        sortable: false,
      },
      {
        headerName: 'Cred',
        field: 'cred',
        sortable: false,
      },
      {   
        headerName: 'Folio',
        field: 'folio',
        sortable: false,
      },
      {
        headerName: 'Nac',
        field: 'nac',
        sortable: false,
      },
      {
        headerName: 'CURP',
        field: 'curp',
        sortable: false,
      }
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
  onSearch(searchBy:any){
    if (searchBy.length >= 10){
      this.gridApi.showLoadingOverlay();
      searchBy = searchBy.toUpperCase();
      this.databaseService.getIneChiapas(searchBy).subscribe((res:any) => {
        this.rowData = res;
        },(error:any) => {
          console.log(error);
        });
    }
    else{
      swalError('Ingrese minimo 10 digitos');
    }
    
    // fetch('https://gruporyc.com.mx:8080/api/db/ineChiapas12/getBy/')
    // .then(result => result.json())
    // .then(rowData => this.rowData = rowData);
  }

  onBtExport() {
    this.gridApi.exportDataAsCsv();
  }


  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //this.gridApi.showLoadingOverlay();
    // fetch('https://gruporyc.com.mx:8080/api/prospectos/findAll/')
    // .then(result => result.json())
    // .then(rowData => this.rowData = rowData);
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

