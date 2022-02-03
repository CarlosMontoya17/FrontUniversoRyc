import { Component, OnInit } from '@angular/core';
import { AuthService } from  'src/app/servicios/auth/auth.service';
import { EncryptService } from  'src/app/servicios/encrypt/encrypt.service';
import { Router } from  "@angular/router";
declare function swalError(mensaje:any): any;
declare function validateLogin(): any;


import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:any;
	password:any;
  dataLogin:any = [];

  ruta: string[] = ['"../assets/img/pexelsryc.jpg"','"../assets/img/pexels7.jpg"','"../assets/img/pexels5.jpg"','"../assets/img/pexels6.jpg"', '"../assets/img/pexels4.jpg"', '"../assets/img/pexels.jpg"'];

  constructor(private authService: AuthService, private encryptService: EncryptService, private  router:  Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null){
      this.router.navigate(['/inicio']);
    }
  }

  validarLogin(username:any, password:any){
  	if(validateLogin()){
  		this.authService.login(username, password).subscribe(res => {
        this.dataLogin = res;
        this.encryptService.encrypt(this.dataLogin);
        const now = new Date();
        localStorage.setItem('token', JSON.stringify(now.getTime()+18000000));
        this.router.navigate(['/inicio']);
      },
      error=> {
        swalError("Credenciales incorrectas");
      });
  	}else{
  		console.log("false");
  	}
  }

  getDia(index:any){
    let dia = new Array(7);
    dia[0] = "Domingo";
    dia[1] = "Lunes";
    dia[2] = "Martes";
    dia[3] = "Miércoles";
    dia[4] = "Jueves";
    dia[5] = "Viernes";
    dia[6] = "Sábado";
    return dia[index];
  }
}