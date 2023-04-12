import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { GenerarComponent } from './generar/generar.component';
import { VerComponent } from './ver/ver.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent },
{path: 'header', component: HeaderComponent },
{path: 'generar', component: GenerarComponent },
{path: 'ver', component: VerComponent },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
