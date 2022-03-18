import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RecuperarContrasenaComponent } from './componentes/recuperar-contrasena/recuperar-contrasena.component';
import { CapturistasComponent } from './componentes/capturistas/capturistas.component';
import { ProspectosComponent } from './componentes/prospectos/prospectos.component';
import { CotizadorComponent } from './componentes/cotizador/cotizador.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TerminosycondicionesComponent } from './componentes/terminosycondiciones/terminosycondiciones.component';
import { PoliticasdeprivacidadComponent } from './componentes/politicasdeprivacidad/politicasdeprivacidad.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { VistaCapturistaComponent } from './componentes/vista-capturista/vista-capturista.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { AgGridModule } from 'ag-grid-angular';
import { CalendarioComponent } from './componentes/calendario/calendario.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { CrmComponent } from './componentes/crm/crm.component';
import { CartasComponent } from './componentes/cartas/cartas.component';
import { ResultadosComponent } from './componentes/resultados/resultados.component';
import { CotizadorNlComponent } from './componentes/cotizador-nl/cotizador-nl.component';
import { VeracruzComponent } from './componentes/veracruz/veracruz.component';
import { TableIneChComponent } from './table-ine-ch/table-ine-ch.component';
import { QuoterpriorityComponent } from './componentes/quoterpriority/quoterpriority.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuoterpanelComponent } from './componentes/quoterpanel/quoterpanel.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchFilterPipe } from './search-filter.pipe';
import { QuoterListComponent } from './componentes/quoter-list/quoter-list.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    InicioComponent,
    LoginComponent,
    RecuperarContrasenaComponent,
    CapturistasComponent,
    ProspectosComponent,
    CotizadorComponent,
    TerminosycondicionesComponent,
    PoliticasdeprivacidadComponent,
    PerfilComponent,
    VistaCapturistaComponent,
    ConfiguracionComponent,
    CalendarioComponent,
    CrmComponent,
    CartasComponent,
    ResultadosComponent,
    CotizadorNlComponent,
    VeracruzComponent,
    TableIneChComponent,
    QuoterpriorityComponent,
    QuoterpanelComponent,
    SearchFilterPipe,
    QuoterListComponent,
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    MatExpansionModule,
    Ng2SearchPipeModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
