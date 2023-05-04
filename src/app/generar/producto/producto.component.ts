import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from './modal.service';
import { CotizacionModel } from '../../../models/cotizacion.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductoModel } from '../../../models/producto.model';
import { AppResponse } from 'src/models/api-response.model';
import { ServiciosService } from '../../services/servicios.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { filter } from 'rxjs/operators';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  titulo: string = "Registrar Producto";
  @Input() cotizaciones: CotizacionModel;

   myControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  produc:  ProductoModel[];
  productos: ProductoModel[];
  prodName: string[] = [];

   cotizacionForm = this.fb.group({
  
    no_solicitud: ['', [Validators.required]],
    no_cotizacion: ['', [Validators.required]],
    empresa: ['', [Validators.required]],
    cliente: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    hora: ['', [Validators.required]],
    producto: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    cantidad: ['', [Validators.required]],
  });

  constructor(public modalService: ModalService, private fb: FormBuilder, private serviciosService: ServiciosService) { }

  ngOnInit(): void {

    this.serviciosService.getProductos().subscribe(
      (resp: AppResponse<ProductoModel[]>) => {

        for(const i in resp.data){

               this.prodName[i] = resp.data[i].name;  // en lavariable this.serie almaceno todas las series
             console.log("Productos", this.prodName[i]);
             }  


        this.productos = resp.data;


      });


    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
      
    );

    // this.prodName = ['Mesa','Silla','Escritorio','Lampara'];


  }

    private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.prodName.filter(option => option.toLowerCase().includes(filterValue));
    
  }

  onChangeObj(newObj) {  // con este metodo filtramos los datos de la base de datos
                         // dependiendo lo que traiga la variable newOnj que en este caso es la serie del equipo
    
    this.produc = this.productos.filter(item => 
    
       item.name == newObj
     )  
    
     
   }

   

     cerrarModal() {
    this.modalService.cerrarModal();
    
  }

}
