import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { PoliticasdeprivacidadComponent } from './componentes/politicasdeprivacidad/politicasdeprivacidad.component';
import { RecuperarContrasenaComponent } from './componentes/recuperar-contrasena/recuperar-contrasena.component';
import { TerminosycondicionesComponent } from './componentes/terminosycondiciones/terminosycondiciones.component';
import { VistaCapturistaComponent } from './componentes/vista-capturista/vista-capturista.component';
import { CalendarioComponent } from "./componentes/calendario/calendario.component";
import { CrmComponent } from './componentes/crm/crm.component';
import { CotizadorComponent } from "./componentes/cotizador/cotizador.component";
import { ResultadosComponent } from "./componentes/resultados/resultados.component";
import { CotizadorNlComponent } from './componentes/cotizador-nl/cotizador-nl.component';
import { VeracruzComponent } from './componentes/veracruz/veracruz.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'recuperar-password',
    component: RecuperarContrasenaComponent
  },
  {
    path: 'terminos-y-condiciones',
    component: TerminosycondicionesComponent
  },
  {
    path: 'politicasdeprivacidad',
    component: PoliticasdeprivacidadComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'crm',
    component: CrmComponent
  },
  {
    path: 'capturista',
    component: VistaCapturistaComponent
  },
  {
    path: 'tablaFull',
    component: ConfiguracionComponent
  },
  {
    path: 'calendario',
    component: CalendarioComponent
  },
  {
    path: 'cotizador',
    component: CotizadorComponent
  },
  {
    path: 'resultados',
    component: ResultadosComponent
  },
  {
    path: 'cotizadorNL',
    component: CotizadorNlComponent
  },
  {
    path: 'cotizadorVr',
    component: VeracruzComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
