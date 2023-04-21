import { Component, OnInit } from '@angular/core';
import { AgregarService } from './agregar/agregar.service';
import { ServiciosService } from '../services/servicios.service';
import { ProductoModel } from '../../models/producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  ProductoSeleccionado: ProductoModel;
  public producto: ProductoModel = new ProductoModel();
  productos: any[];

  constructor(private agregarService: AgregarService, private serviciosService: ServiciosService,) { }


  ngOnInit(): void {


    this.serviciosService.getProductos().subscribe(
      resp => {

        console.log(resp.data);

        this.productos = resp.data;

      });

  }

  abrirModal(producto: ProductoModel) {
    this.ProductoSeleccionado = producto;
    this.agregarService.abrirModal();
  }

}
