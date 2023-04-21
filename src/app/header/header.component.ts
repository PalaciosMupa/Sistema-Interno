
import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

   menu:any[] = [];
  menu_obj: any[] = [];
  submenu_obj: any[] = [];
  trn_obj: any[] = [];
  menu_json:string[] = [];
  nuevo: any[] = [];

  autenticado:boolean = false;


  

   constructor(private observer: BreakpointObserver, private authService: LoginService,)
         { }


   

    ngOnInit(): void {

      if (this.authService.isAuthenticated()) {
      this.autenticado = true;
    }

    /*  this.menu = [{'id':1, 'nombre':'Generar_Cotización', 'tipo':'M', 'nombreinterno':'','objetopadre':0},
        {'id':4, 'nombre':'Clientes', 'tipo':'S', 'nombreinterno':'','objetopadre':1},
        {'id':3, 'nombre':'Clientes', 'tipo':'T', 'nombreinterno':'/clientes','objetopadre':1},
        {'id':2, 'nombre':'Regiones', 'tipo':'T', 'nombreinterno':'/regiones','objetopadre':1},
        {'id':5, 'nombre':'Productos', 'tipo':'T', 'nombreinterno':'/productos','objetopadre':4},
        {'id':16, 'nombre':'Ver_Cotizaciones', 'tipo':'M', 'nombreinterno':'','objetopadre':0},
        {'id':21, 'nombre':'Productos', 'tipo':'S', 'nombreinterno':'','objetopadre':1},
        {'id':17, 'nombre':'Roles', 'tipo':'T', 'nombreinterno':'/roles','objetopadre':16},
        {'id':18, 'nombre':'Usuarios', 'tipo':'T', 'nombreinterno':'/usuarios','objetopadre':21},
        {'id':19, 'nombre':'Menus', 'tipo':'T', 'nombreinterno':'/menus','objetopadre':21},
        {'id':9, 'nombre':'Entregas', 'tipo':'M', 'nombreinterno':'','objetopadre':0},
        {'id':10, 'nombre':'Contenidos', 'tipo':'T', 'nombreinterno':'/contenidos','objetopadre':9},
        {'id':23, 'nombre':'Catalogos', 'tipo':'M', 'nombreinterno':'','objetopadre':0},
        {'id':24, 'nombre':'Clientes', 'tipo':'T', 'nombreinterno':'','objetopadre':23},
        {'id':25, 'nombre':'Directiva', 'tipo':'T', 'nombreinterno':'/directivas','objetopadre':24},
        {'id':26, 'nombre':'Administración', 'tipo':'M', 'nombreinterno':'','objetopadre':0},
        {'id':27, 'nombre':'Quejas', 'tipo':'S', 'nombreinterno':'','objetopadre':1},
        {'id':28, 'nombre':'Reporte', 'tipo':'T', 'nombreinterno':'/quejas','objetopadre':1}]  */

      this.menu = [{'id':1, 'nombre':'Generar-Cotización', 'tipo':'M', 'nombreinterno':'','objetopadre':0},
                   {'id':2, 'nombre':'Ver-Cotización', 'tipo':'M', 'nombreinterno':'','objetopadre':0},    
                   {'id':3, 'nombre':'Entregas', 'tipo':'M', 'nombreinterno':'','objetopadre':0},  
                   {'id':4, 'nombre':'Entregas-Normales', 'tipo':'S', 'nombreinterno':'','objetopadre':3},  
                   {'id':5, 'nombre':'Administración', 'tipo':'M', 'nombreinterno':'','objetopadre':0},  
                   {'id':6, 'nombre':'Catalogos', 'tipo':'M', 'nombreinterno':'','objetopadre':0},
                   {'id':7, 'nombre':'Generar', 'tipo':'T', 'nombreinterno':'/generar','objetopadre':1}, 
                   {'id':8, 'nombre':'Ver', 'tipo':'T', 'nombreinterno':'/ver','objetopadre':2},
                   {'id':9, 'nombre':'Entregas-Especiales', 'tipo':'S', 'nombreinterno':'/ver','objetopadre':3},
                   {'id':10, 'nombre':'Entregar', 'tipo':'T', 'nombreinterno':'/ver','objetopadre':4},
                   {'id':11, 'nombre':'Entregar', 'tipo':'T', 'nombreinterno':'/ver','objetopadre':9},
                   {'id':12, 'nombre':'Clientes', 'tipo':'T', 'nombreinterno':'/generar','objetopadre':6},
                   {'id':13, 'nombre':'Productos', 'tipo':'T', 'nombreinterno':'/producto','objetopadre':6},
                   {'id':14, 'nombre':'Usuarios', 'tipo':'T', 'nombreinterno':'/generar','objetopadre':5},
                   {'id':15, 'nombre':'Roles', 'tipo':'T', 'nombreinterno':'/ver','objetopadre':5},   
        ]

  

     this.menu_obj = this.menu.filter((obj) => {

     return obj.tipo === 'M'
     });

       this.submenu_obj = this.menu.filter((obj) => {

      return obj.tipo === 'S'
     });

 this.trn_obj = this.menu.filter((obj) => {

     return  obj.tipo === 'T'
     });

 
    
  }

   logout(): void {
    //let username = this.authService.usuario.username;
    this.authService.logout();
   
  }

  onSelect(data: any): void {
       console.log('Item clicked', JSON.parse(JSON.stringify(data)));
     }

     onActivate(data: any): void {
       console.log('Activate', JSON.parse(JSON.stringify(data)));
     }

     onDeactivate(data: any): void {
       console.log('Deactivate', JSON.parse(JSON.stringify(data)));
     }


}
