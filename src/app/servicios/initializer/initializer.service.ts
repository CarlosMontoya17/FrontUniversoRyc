import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class InitializerService {

  constructor() { }

  init(){
    if(localStorage.getItem('dist2')!=null){
      const itemStr = localStorage.getItem('dist2') || '{}';
      const item = JSON.parse(itemStr);
      const now = new Date();
      if(now.getTime() > item) {
        localStorage.removeItem('dist2');
        localStorage.removeItem('dist');
      }else{
        if(localStorage.getItem('dist')!=null){
          var decrypted = CryptoJS.AES.decrypt(localStorage.getItem('dist') || '{}', "data");
          var result:any = decrypted.toString(CryptoJS.enc.Utf8);
          result = JSON.parse(result);
          return result;
        }
      }
    }
  }
}
