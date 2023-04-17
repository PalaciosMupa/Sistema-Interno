import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from './modal.service';
import { CotizacionModel } from '../../../models/cotizacion.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  titulo: string = "Registrar Producto";
  @Input() cotizaciones: CotizacionModel;

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

   

     cerrarModal() {
    this.modalService.cerrarModal();
    
  }

}
