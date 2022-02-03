import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Router } from  "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor(private  router:  Router) { }

  encrypt(data:any){
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), "data");
    const now = new Date();
    localStorage.setItem('dist', encrypted.toString());
    localStorage.setItem('dist2', JSON.stringify(now.getTime()+18000000));
    this.router.navigate(['/inicio']);
  }
}
