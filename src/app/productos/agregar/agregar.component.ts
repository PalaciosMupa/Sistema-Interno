import { Component, OnInit, Input  } from '@angular/core';
import { AgregarService } from './agregar.service';
import { ProductoModel } from '../../../models/producto.model';
import { LoginService } from '../../services/login.service';
import { ServiciosService } from '../../services/servicios.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {
    titulo: string = "Registro de Producto";
    @Input() producto: ProductoModel;
    presentacion: any[] = [];
    errores: string[];
      

    productoForm = this.fb.group({
  
    name: ['', [Validators.required]],
    presentation: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });


    constructor(public agregarService: AgregarService, private fb: FormBuilder,private serviciosService: ServiciosService,
               private activatedRoute: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {

     // this.presentacion = ['Caja','Pieza','Paquete','Bolsa','Rollo','Galon','Litro','Kilo'  ];

     this.presentacion = [{'id':1, 'nombre':'Caja'},
                   {'id':2, 'nombre':'Pieza'},    
                   {'id':3, 'nombre':'Paquete'},  
                   {'id':4, 'nombre':'Bolsa'},
                    {'id':5, 'nombre':'Rollo'},    
                   {'id':6, 'nombre':'Galon'},  
                   {'id':7, 'nombre':'Litro'},
                   {'id':8, 'nombre':'Kilo'}
                   ]    

     if(this.productoForm.value.name != "" || this.productoForm.value.name != null){

      this.productoForm.setValue({name: this.producto.name, presentation: this.producto.presentation, description: this.producto.description});
     }


  
  }


  guardar() {
   

       this.serviciosService.guardarProducto(this.productoForm.value).subscribe(
        repuestos => {

         
        swal.fire('Registro Efectuado', 'se realizó el registro correctamente', 'success');
        this.productoForm.setValue({name: '', presentation: '', description: ''});
         
        
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );

     

    
  }

      updateProducto(): void {
  
  this.serviciosService.updateProducto(this.productoForm.value, this.producto)
    .subscribe(
      json => {
        
        swal.fire('El Producto fue Actualizado', 'El producto se Actualizó con éxito', 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
  }   

 

      cerrarModal() {
    this.agregarService.cerrarModal();
    window.location.reload();
    
  }

}
