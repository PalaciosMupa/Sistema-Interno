import { Component, OnInit } from '@angular/core';
import { CotizacionModel } from '../../models/cotizacion.model';
import { EmpresaModel } from '../../models/empresa.model';

@Component({
  selector: 'app-generar',
  templateUrl: './generar.component.html',
  styleUrls: ['./generar.component.css']
})
export class GenerarComponent {

 // cotizacion: CotizacionModel[];
  empresas: any[] = [];
  cliente: any[] = []; 
  public cotizacion: CotizacionModel = new CotizacionModel();


  ngOnInit(): void {

    

      this.empresas = [{'id':1, 'nombre':'Bangra'},
                   {'id':2, 'nombre':'Gesit'},    
                   {'id':3, 'nombre':'Consumibles'},  
                   {'id':4, 'nombre':'Papeleria'}]

      this.cliente = [{'id':1, 'nombre':'Municipio de Atizapan'},
                   {'id':2, 'nombre':'SEDENA'},    
                   {'id':3, 'nombre':'GN'},  
                   {'id':4, 'nombre':'Municipio de Naucalpan'}]

  

    
  }

}
