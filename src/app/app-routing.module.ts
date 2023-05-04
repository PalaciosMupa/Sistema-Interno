import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { GenerarComponent } from './generar/generar.component';
import { VerComponent } from './ver/ver.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductosComponent } from './productos/productos.component';
import { ClientesComponent } from './clientes/clientes.component';


const routes: Routes = [
  {path: '', component: LoginComponent },
{path: 'header', component: HeaderComponent },
{path: 'generar', component: GenerarComponent },
{path: 'ver', component: VerComponent },
{path: 'dash', component: DashboardComponent },
{path: 'producto', component: ProductosComponent },
{path: 'clientes', component: ClientesComponent },
//{ path: '', redirectTo: 'header', pathMatch: 'full' }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
