import { Component, OnInit, Input } from '@angular/core';
import { ClienteService } from './cliente.service';
import { ClienteModel } from '../../../models/cliente.model';
import { LoginService } from '../../services/login.service';
import { ServiciosService } from '../../services/servicios.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clie',
  templateUrl: './clie.component.html',
  styleUrls: ['./clie.component.css']
})
export class ClieComponent {
  titulo: string = "Registro de Clientes";
  @Input() cliente: ClienteModel;
  errores: string[];

  clienteForm = this.fb.group({
  
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required]],
    address: ['', [Validators.required]],
    contact: ['', [Validators.required]],
  });

  constructor(public clienteService: ClienteService, private fb: FormBuilder,private serviciosService: ServiciosService,
               private activatedRoute: ActivatedRoute, private router: Router) { }


 ngOnInit(): void {

     // this.presentacion = ['Caja','Pieza','Paquete','Bolsa','Rollo','Galon','Litro','Kilo'  ];

     

     if(this.clienteForm.value.name != "" || this.clienteForm.value.name != null){

      this.clienteForm.setValue({name: this.cliente.name, phone: this.cliente.phone, email: this.cliente.email, address: this.cliente.address, contact: this.cliente.contact});
     }


  
  }


  guardarCliente() {
   

       this.serviciosService.guardarCliente(this.clienteForm.value).subscribe(
        repuestos => {

         
        swal.fire('Registro Efectuado', 'se realizó el registro correctamente', 'success');
        this.clienteForm.setValue({name: '', phone: '', email: '', address:'', contact:''});
         
        
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );

     

    
  }

    updateCliente(): void {
  
  this.serviciosService.updateCliente(this.clienteForm.value, this.cliente)
    .subscribe(
      json => {
        
        swal.fire('El Cliente fue Actualizado', 'El cliente se Actualizó con éxito', 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
  }   




   cerrarModal() {
    this.clienteService.cerrarModal();
    window.location.reload();
    
  }

}
