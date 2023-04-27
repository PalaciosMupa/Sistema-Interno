import { Component, OnInit } from '@angular/core';
import { AgregarService } from './agregar/agregar.service';
import { ServiciosService } from '../services/servicios.service';
import { ProductoModel } from '../../models/producto.model';
import { AppResponse } from 'src/models/api-response.model';
import Swal from 'sweetalert2';

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
      (resp: AppResponse<ProductoModel[]>) => {

       
        this.productos = resp.data;

      });


  }

    delete(producto: ProductoModel): void {
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

          this.serviciosService.deleteProducto(producto).subscribe(
            () => {
              this.productos = this.productos.filter(cli => cli !== producto)
              Swal.fire(
                'Producto!',
                'Producto Eliminado con éxito.',
                'success'
              )
            }
          )

        }
      });
    }

  abrirModal(producto: ProductoModel) {
    this.ProductoSeleccionado = producto;
    this.agregarService.abrirModal();
  }

}
