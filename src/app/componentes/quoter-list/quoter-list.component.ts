import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { InitializerService } from  'src/app/servicios/initializer/initializer.service';
import { DatabaseService } from 'src/app/servicios/database/database.service';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

declare function swalLoading(): any;
declare function closeAlert(): any;
declare function swalMixin(icon:any, msg: any): any;
declare function swalMixinLoad(icon: any, msg: any): any;
declare function getArray():any;

@Component({
  selector: 'app-quoter-list',
  templateUrl: './quoter-list.component.html',
  styleUrls: ['./quoter-list.component.css']
})
export class QuoterListComponent implements OnInit {

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
  result:any = [];
  searchBy: any;
  usuario:any = 'Usuario';
  rowSelection:any;
  list:any = [];
  p: number = 1;
  reload:any;
  selected:any = [];
  namesSelected:any = [];
  modoTabla: Boolean = false;

  constructor(private databaseService: DatabaseService, private initializerService : InitializerService, private router: Router) { 
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
      field: 'nom_aseg',
      filter: true
      
    },
    {
      headerName: 'Municipio',
      field: 'nombremunicipio',
      sortable: false,
      filter: true
    },
    {
      headerName: 'Empresa',
      field: 'nom_pat',
      filter: true
    },
    {
      headerName: 'Aplica',
      field: 'aplica',
      filter: true
    },
    {
      headerName: 'Excepcion',
      field: 'excepcion',
    },
    {
      headerName: 'Linea 4',
      field: 'montolinea4',
      filter: true
    },
    {
      headerName: 'Linea 2',
      field: 'montolinea2',
      filter: true
    },
    {
      headerName: 'Des. Mensual',
      field: 'descmensual',
      filter: true
    }
  ];
  this.rowSelection = 'multiple';
  this.defaultColDef = {
    width: 200,
    filter: 'agTextColumnFilter',
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
    swalLoading();
    this.init();
    
  }

  async init() {
    var result = await this.initializerService.init();
    if (result != null) {
      this.result = result;
      this.getList();
      
      
    }
  }

  onSelectionChanged(params: any) {
    let selectedRows = this.gridApi.getSelectedRows();
    let names:any = [];
    let selected:any = [];
    selectedRows.forEach(function (select: any, index:any){
        selected.push(selectedRows[index].id);
        names.push(selectedRows[index].nom_aseg);
      }
    );
    this.selected = selected;
    this.namesSelected = names;
  }


  print(){
    console.log(this.selected);
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
  }

  getList(){
    const user = this.result.username;
    this.databaseService.getPrioryList(user).subscribe((res:any)=>{
      this.list = res;
      this.rowData = res;
      closeAlert();
    });
  }

  onSearch(searchBy:any){
    if (searchBy.length >= 4){
      searchBy = searchBy.toUpperCase();
      this.databaseService.getIneChiapas(searchBy).subscribe((res:any) => {
        },(error:any) => {
          console.log(error);
        });
    }
    else{
      swalMixin("error",'Ingrese minimo 4 digitos');
    }
  }

 requoter(){
    this.databaseService.reloadPriory(this.reload, this.result.username).subscribe((res: any) =>{
      swalMixin("success", "Solicitud enviada")
    }, (error:any) =>{
      swalMixin("error", "Error de envio")
    })
    
  }
  setValue(id:any){
    this.reload = id;
  }

}
