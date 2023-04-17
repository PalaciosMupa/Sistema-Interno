import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { GenerarComponent } from './generar/generar.component';
import { VerComponent } from './ver/ver.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path: '', component: LoginComponent },
{path: 'header', component: HeaderComponent },
{path: 'generar', component: GenerarComponent },
{path: 'ver', component: VerComponent },
{path: 'dash', component: DashboardComponent },
//{ path: '', redirectTo: 'header', pathMatch: 'full' }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
