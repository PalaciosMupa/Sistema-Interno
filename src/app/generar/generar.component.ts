import { Component, OnInit } from '@angular/core';
import { CotizacionModel } from '../../models/cotizacion.model';
import { EmpresaModel } from '../../models/empresa.model';
import { ClienteModel } from '../../models/cliente.model';
import { ModalService } from './producto/modal.service';
import { ServiciosService } from '../services/servicios.service';
import { AppResponse } from 'src/models/api-response.model';

@Component({
  selector: 'app-generar',
  templateUrl: './generar.component.html',
  styleUrls: ['./generar.component.css']
})
export class GenerarComponent {

 // cotizacion: CotizacionModel[];
  empresas: any[] = [];
  cliente: any[] = [];
  clientes: any[]; 
  public cotizacion: CotizacionModel = new CotizacionModel();
  CotizacionSeleccionada: CotizacionModel;

  constructor( private modalService: ModalService, private serviciosService: ServiciosService) { }


  ngOnInit(): void {

       this.serviciosService.getClientes().subscribe(
      (resp: AppResponse<ClienteModel[]>) => {

       
        this.clientes = resp.data;

      });    

      this.empresas = [{'id':1, 'nombre':'Bangra'},
                   {'id':2, 'nombre':'Gesit'},    
                   {'id':3, 'nombre':'Consumibles'},  
                   {'id':4, 'nombre':'Papeleria'}]

      this.cliente = [{'id':1, 'nombre':'Municipio de Atizapan'},
                   {'id':2, 'nombre':'SEDENA'},    
                   {'id':3, 'nombre':'GN'},  
                   {'id':4, 'nombre':'Municipio de Naucalpan'}]

  

    
  }

   abrirModal(cotizaciones: CotizacionModel) {
    this.CotizacionSeleccionada = cotizaciones;
    this.modalService.abrirModal();
  }

}
