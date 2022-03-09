import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const urlApi = 'https://gruporyc.com.mx:8080';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem("token") + ''
  })
};
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {



  constructor(private http: HttpClient) { }

  /*getDbIndex(db:any){
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token' :  localStorage.getItem("token")+''
      })
    };
    return this.http.get(urlApi+db, httpOptions);
  }

  updateDbIndex(id:any, newIndex:any){
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token' :  localStorage.getItem("token")+''
      })
    };
    return this.http.put(urlApi+id, {
      index : newIndex
    },httpOptions).subscribe(
    data => console.log("ok"),
    error => console.log(error)
    );
  }

  addRegister(capturista:any, cantidadAsignada:any, indexActual:any, indexFinal:any){
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token' :  localStorage.getItem("token")+''
      })
    };
    return this.http.post(urlApi2, {
      capturista: capturista, 
      cantAsignado: cantidadAsignada,
      hechos: 0,
      indexActual : indexActual,
      indexFinal : indexFinal}, httpOptions).subscribe(
    data => console.log("ok"),
    error => console.log(error)
    );
  }

  getRegisters(username:any){
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token' :  localStorage.getItem("token")+''
      })
    };
    return this.http.get(urlApi2+username, httpOptions);
  }

  getData(indexInicial:any, indexFinal:any){
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token' :  localStorage.getItem("token")+''
      })
    };
    return this.http.get(urlApi3+indexInicial+'/'+indexFinal, httpOptions);
  }*/

  getProspectos() {
    return this.http.get(urlApi + '/api/prospectos/findAll/', httpOptions);
  }

  getProspectosByCond(cond: any) {
    return this.http.get(urlApi + '/api/prospectos/find/' + cond, httpOptions);
  }

  getCalendarioById(id: any) {
    return this.http.get(urlApi + '/api/asistencias/get/' + id, httpOptions);

  }

  getUsersAttendance() {
    return this.http.get(urlApi + '/api/users/getUsersAttendance/', httpOptions);
  }

  getUsersAttendanceAsistencia(id: any, diaslaborados: any, retardos: any) {
    return this.http.put(urlApi + '/api/users/getUsersAttendanceAsistencia/' + id, { diaslaborados: diaslaborados, retardos: retardos }, { responseType: 'text' });
  }

  getBusinessDays(idUsuario: any, startDate: any, endDate: any) {
    return this.http.get(urlApi + '/api/users/getBusinessDays/' + idUsuario + "/" + startDate + "/" + endDate, httpOptions)
  }

  getRegisterCotizador(inferior: any, superior: any) {
    return this.http.get(urlApi + '/api/prospectosnl/getByRange/' + inferior + "/" + superior, httpOptions);
  }

  getRegisterCotizadorVr(inferior: any, superior: any) {
    return this.http.get(urlApi + '/api/mainvr/findByRange/' + inferior + "/" + superior, httpOptions);
  }

  getDireccion(curp: any) {
    return this.http.get(urlApi + '/api/db/ineChiapas12/get/direccion/' + curp, httpOptions);
  }

  getDireccionNuevoleon(curp: any) {
    return this.http.get(urlApi + '/api/db/inenl/get/direccion/' + curp, httpOptions);
  }

  getDireccionVr(curp: any) {
    return this.http.get(urlApi + '/api/db/ineVeracruz2018/get/direccion/' + curp, httpOptions);
  }

  putDatos(id: any, direccion: any, anotacion: any) {
    return this.http.put(urlApi + '/api/prospectosnl/updatePrecalif/' + id, { direccion: direccion, anotacion: anotacion }, { responseType: 'text' });
  }

  getResultados() {
    return this.http.get(urlApi + '/api/prospectosnl/getProspectNL/', httpOptions);
  }

  getResultadosVeracruz() {
    return this.http.get(urlApi + '/api/prospectosvr/getProspectVR/', httpOptions);
  }

  putDatosVr(id: any, direccion: any, anotacion: any) {
    return this.http.put(urlApi + '/api/mainvr/updatePrecalif/' + id, { direccion: direccion, anotacion: anotacion }, { responseType: 'text' });
  }

  getIneChiapas(searchBy:any){
    return this.http.get(urlApi +'/api/db/ineChiapas12/getBy/'+searchBy, httpOptions)
  }

  getEnterprises(){
    return this.http.get(urlApi + '/api/mainch/giveEnterprises/', httpOptions)
  }

  getMunicipality(){
    return this.http.get(urlApi + '/api/mainch/giveMunicipality/', httpOptions)
  }

  getDataPriory(municipio: any, empresa:any, salario:any){
    return this.http.get(urlApi + '/api/mainch/giveCounts/'+municipio+"/"+empresa+"/"+salario, httpOptions)
  }
  putPriory(username:any, municipio:any ,empresa: any, salario:any){
    return this.http.put(urlApi + '/api/mainch/prioryData/'+username, {byMun: municipio, byEnterprise: empresa, bySalary: salario} , { responseType: 'text'})
  }


}
