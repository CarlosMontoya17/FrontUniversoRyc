import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

const urlApi = 'https://gruporyc.com.mx:8080';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getCapturistas(rol:any){
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token' :  localStorage.getItem("token")+''
      })
    };
    return this.http.get(urlApi+'/api/users/findUsersByRole/'+rol, httpOptions);
  }
}
