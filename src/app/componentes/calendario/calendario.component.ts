import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { DatabaseService } from 'src/app/servicios/database/database.service';
import esLocale from '@fullcalendar/core/locales/es';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
declare function swalOk(mensaje:any): any;
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  p: number = 1;
  vista:any =3;
  data: any = [];
  users: any = [];
  diasLaborales:any=[];
  diaslaborados:any=[];
  retardos:any=[];
  diasRetardo:any=[];
  bono:any=[];
  eventFromApiPush : any = [];
  agregarDias = 0;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',

    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },

    eventTimeFormat: { 
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short'
    },
    locale: esLocale,
    contentHeight: "auto",
    weekends: true,
    editable: false,
    selectable: true,
    eventShortHeight:60,
    expandRows: true,
    selectMirror: true,
    dayMaxEvents: true,
  };

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.getUsersAttendace();
  }
  getCalendarUser(id: any) {
    this.eventFromApiPush = [];
    this.databaseService.getCalendarioById(id).subscribe((res: any) => {
      this.data = res;
      this.data.forEach((element:any) => {
        this.eventFromApiPush.push({
          title: element.data.title,
          start:element.data.start,
          color: element.data.color
        });
      });
      console.log(this.data);
      this.calendarOptions.eventSources = [this.eventFromApiPush]
    }, (error: any) => {
      console.log(error);
    });
  }

  editAsistencias(id: any, diaslaborados:any, retardos:any){
    this.databaseService.getUsersAttendanceAsistencia(id, diaslaborados, retardos).subscribe((res: any) => {
      swalOk("Guardado correctamente");
      console.log(res);
    }, (error: any) => {
      console.log(error);
    });
  }

  getUsersAttendace(){
    const today = new Date()
    if(today.getMonth() == 1){
      this.agregarDias = 2;
    }
    if(today.getDate() < 16){
      var cadena = (today.getMonth() < 10 ? '0' : '') + (today.getMonth() + 1)+"/01/" +"/"+String(today.getFullYear());
      var startDay:any = new Date(cadena);
    }else{
      var cadena = (today.getMonth() < 10 ? '0' : '') + (today.getMonth() + 1)+"/16/" +"/"+String(today.getFullYear());
      var startDay:any = new Date(cadena);
    }

    while (startDay <= today) {
      var day = startDay.getDay()
        if (day == 0) {
          this.agregarDias = this.agregarDias + 1;
        }
      startDay.setDate(startDay.getDate() + 1);
    }

    this.databaseService.getUsersAttendance().subscribe((res: any) => {
      this.users=res;
      for(var x=0; x<this.users.length; x++){
        if(today.getDate() < 16){
          this.bono[this.users[x].id] = this.users[x].bonoQuincenal;
        }else{
          this.bono[this.users[x].id] = this.users[x].bonoMensual;
        }
        this.diasLaborales[this.users[x].id] = Math.ceil( Number(this.users[x].diaslaborados) + this.agregarDias);
        this.diasRetardo[this.users[x].id]= Math.floor((Number(this.users[x].retardos) /3)  );
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  downloadPDFEmpleado(){
    const today = new Date()
    const tabla= document.getElementById('htmlData')!;
    const doc = new jsPDF('l', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
    };
    html2canvas(tabla, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      let mes = new Date().toLocaleDateString("es", { month: "short", year: "numeric"  }, );
      // Add image Canvas to PDF
      const bufferX = 0;
      const bufferY = 55;
      const imgProps = (doc as any).getImageProperties(img);
      let pdfWidth = doc.internal.pageSize.getWidth()- 2 * bufferX;
      let pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.setFont('Helvetica-Bold');
      doc.text('REGISTRO DE ASISTENCIA DE EMPLEADO', 30, 30);
      if(today.getDate() < 16){
        doc.text('01 al 15 ', 30, 50);
      }else{
        doc.text('16 al 30 ', 30, 50);
      }
      doc.text('Grupo Ryc - Inco Vivir Bien', 180, 50);
      doc.text(String(mes.toUpperCase()), 85, 50);
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'SLOW');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_reporte.pdf`);                                      
    });
  }

  cambiarVista(id:any){
    this.vista=id;
  }

  downloadPDFull(){
    const today = new Date()
    const tabla= document.getElementById('htmlDataFull')!;
    const doc = new jsPDF('l', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
      pagesplit: true
    };
    html2canvas(tabla, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      let mes = new Date().toLocaleDateString("es", { month: "short", year: "numeric"  }, );
      // Add image Canvas to PDF
      const bufferX = 30;
      const bufferY = 80;
      const imgProps = (doc as any).getImageProperties(img);
      // const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      let pdfWidth = doc.internal.pageSize.getWidth()- 2 * bufferX;
      let pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.setFont('Helvetica-Bold');
      doc.text('REGISTRO DE ASISTENCIA DE EMPLEADO', 30, 30);
      if(today.getDate() < 16){
        doc.text('01 al 15 ', 30, 50);
      }else{
        doc.text('16 al 30 ', 30, 50);
      }
      doc.text('Grupo Ryc - Inco Vivir Bien', 180, 50);
      doc.text(String(mes.toUpperCase()), 85, 50);
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'SLOW');
      doc.addPage;
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_reporte.pdf`);
    });
  }
}
