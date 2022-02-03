import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
const urlApi = 'https://gruporyc.com.mx:8080';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username:any, password:any){
  	return this.http.post(urlApi+ '/api/auth/signin/', {username, password});
  }
}
