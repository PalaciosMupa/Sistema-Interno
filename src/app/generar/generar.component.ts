import { Component, OnInit } from '@angular/core';
import { CotizacionModel } from '../../models/cotizacion.model';
import { EmpresaModel } from '../../models/empresa.model';
import { ClienteModel } from '../../models/cliente.model';
import { ModalService } from './producto/modal.service';
import { ServiciosService } from '../services/servicios.service';
import { AppResponse } from 'src/models/api-response.model';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar',
  templateUrl: './generar.component.html',
  styleUrls: ['./generar.component.css']
})
export class GenerarComponent {

  cotizaciones: CotizacionModel[];
  cotizacione: CotizacionModel[];
  empresas: any[] = [];
  cotizacion1: any[] = [];
  cliente: any[] = [];
  clientes: any[]; 
  cooki: string;
  cookiNum: number; 
  public cotizacion: CotizacionModel = new CotizacionModel();
  CotizacionSeleccionada: CotizacionModel;
   suma1:number=0;
   suma2:number=0;
   suma3:number=0;

  constructor( private modalService: ModalService, private serviciosService: ServiciosService) { }


  ngOnInit(): void {

       this.serviciosService.getClientes().subscribe(
      (resp: AppResponse<ClienteModel[]>) => {

       
        this.clientes = resp.data;

      });    

         this.serviciosService.getEmpresas().subscribe(
      (resp: AppResponse<EmpresaModel[]>) => {

       
        this.empresas = resp.data;

      }); 

     /* this.empresas = [{'id':1, 'nombre':'Bangra'},
                   {'id':2, 'nombre':'Gesit'},    
                   {'id':3, 'nombre':'Consumibles'},  
                   {'id':4, 'nombre':'Papeleria'}]   */

      this.cliente = [{'id':1, 'nombre':'Municipio de Atizapan'},
                   {'id':2, 'nombre':'SEDENA'},    
                   {'id':3, 'nombre':'GN'},  
                   {'id':4, 'nombre':'Municipio de Naucalpan'}]

  
  this.serviciosService.getCotizaciones().subscribe(
      (resp: AppResponse<CotizacionModel[]>) => {

       
        this.cotizaciones = resp.data;
       

      });

   this.cooki = sessionStorage.getItem('cotizacion');
   this.cookiNum = +this.cooki;
   console.log("no",this.cooki);
 // this.serviciosService.getCotizaciones().subscribe((cotizacioness:AppResponse<CotizacionModel[]>) => {
 //    this.cotizacione = cotizacioness.filter(
 //    (cotizacioness:AppResponse<CotizacionModel[]>) => cotizacioness.data.noQuote == this.cooki)

  //   });

     this.serviciosService.getCotizaciones().subscribe(
      (resp: AppResponse<CotizacionModel[]>) => {

        this.cotizacione = resp.data;
       //  this.cotizacion1 = resp.data;

        this.cotizacione = this.cotizacione.filter(item => 
    
       item.noQuote == this.cookiNum,
      
     );

       this.cotizacion1 = this.cotizacione;
        for(let j=0; j < this.cotizacion1.length; j++){   
       this.suma1 += this.cotizacione[j].subtotal; 
       this.suma2 += this.cotizacione[j].iva;
       this.suma3 += this.cotizacione[j].total;
         
  }  
        });

//console.log("Tamaño", this.cotizacione.length);

    


    

  

    
  }

    delete(cotizacion: CotizacionModel): void {
    Swal.fire({
  title: 'Esta usted Seguro?',
  text: "No se podra revertir esto!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, Eliminar esto!'
}).then((result) => {
        if (result.isConfirmed) {

          this.serviciosService.deleteCotizacion(cotizacion).subscribe(
            () => {
              this.cotizacione = this.cotizacione.filter(cli => cli !== cotizacion)
              Swal.fire(
                'Artículo!',
                'Artículo Eliminado con éxito.',
                'success'
              )
            }
          )

        }
      });
    }

   abrirModal(cotizaciones: CotizacionModel) {
    this.CotizacionSeleccionada = cotizaciones;
    this.modalService.abrirModal();

    

  }

  eliminarCocki(){
sessionStorage.removeItem('cotizacion');
sessionStorage.removeItem('compania');
sessionStorage.removeItem('cliente');
sessionStorage.removeItem('solicitud');
 window.location.reload();
;

  }

}
