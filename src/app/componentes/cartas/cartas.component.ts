import { Component, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import {  DatabaseService } from  'src/app/servicios/database/database.service';


@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.css']
})
export class CartasComponent implements OnInit {
  cartas:any = [];

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    //this.getCartas();
  }

  generarPDF(nombre:any){
    var imgData = 'assets/formato/0001.jpg'
    const doc = new jsPDF('p', 'mm', 'letter');
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    doc.addImage(imgData, 'JPEG', 0, 0, width, height);
    doc.setFontSize(15)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(255, 0, 0)
    doc.text(nombre, 48, 65);
    doc.save(nombre+'.pdf');
  }

  getCartas(){
    this.databaseService.getRegisterCotizador(430,10).subscribe((res:any) => {
      this.cartas = res;
      this.recorrerCartas();
    },(error:any)=> {
      console.log(error)
    });
  }

  recorrerCartas(){
    for(let i = 0; i < this.cartas.length; i++){
       this.generarPDF(this.cartas[i].nombre);
    }
  }

}
