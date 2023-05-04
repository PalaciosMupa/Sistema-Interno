import { Component, OnInit } from '@angular/core';
import { ClienteService } from './clie/cliente.service';
import { ServiciosService } from '../services/servicios.service';
import { ClienteModel } from '../../models/cliente.model';
import { AppResponse } from 'src/models/api-response.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  ClienteSeleccionado: ClienteModel;
  public cliente: ClienteModel = new ClienteModel();
  clientes: any[];

  constructor(private clienteService: ClienteService, private serviciosService: ServiciosService) { }



  ngOnInit(): void {


    this.serviciosService.getClientes().subscribe(
      (resp: AppResponse<ClienteModel[]>) => {

       
        this.clientes = resp.data;

      });


  }


     delete(cliente: ClienteModel): void {
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

          this.serviciosService.deleteCliente(cliente).subscribe(
            () => {
              this.clientes = this.clientes.filter(cli => cli !== cliente)
              Swal.fire(
                'Cliente!',
                'Cliente Eliminado con éxito.',
                'success'
              )
            }
          )

        }
      });
    }



   abrirModal(cliente: ClienteModel) {
    this.ClienteSeleccionado = cliente;
    this.clienteService.abrirModal();
  }


}
