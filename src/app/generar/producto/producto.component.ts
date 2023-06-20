import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from './modal.service';
import { CotizacionModel } from '../../../models/cotizacion.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductoModel } from '../../../models/producto.model';
import { EmpresaModel } from '../../../models/empresa.model';
import { ClienteModel } from '../../../models/cliente.model';
import { AppResponse } from 'src/models/api-response.model';
import { ServiciosService } from '../../services/servicios.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import {map, startWith} from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  titulo: string = "Registrar Producto";
  @Input() cotizacion: CotizacionModel;

   myControl = new FormControl('');
  filteredOptions: Observable<any[]>;
   errores: string[];
   pipe = new DatePipe('en-US');
  fechaHoy = null;

  produc:  ProductoModel[];
  productos: ProductoModel[];
  cotizaciones: CotizacionModel[];
  comentario:boolean=false;

 
  prodName: any[] = [];
  empresas: any[] = [];
  clientes: any[];
  cotiza: number;
  numero: number;
  cot: string; 
  coti: string;
  company: string;
  cliente: string;
  solicitud: string;
  solic: string;
  solici: string;
  cliente1: string;
  compania1: string;
  productoss: string;
  comentarios: string;
  cantidad: string;
  precio: string;



  subtotal: string;
  subtota: number;
  subtot: number;
  price: string;
  pric: number;
  ivas: number;
  iva: string;
  totall: number;
  total: string;
  selectedSizeValues: string;

    test: string ='';

   cotizacionForm = this.fb.group({
  
    noQuote: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    noRequest: ['', [Validators.required]],
    total: ['', [Validators.required]],
    subtotal: ['', [Validators.required]],
    iva: ['', [Validators.required]],
    company: ['', [Validators.required]],
    customer: ['', [Validators.required]],
    date: [''],
    time: ['12:23'],
    product: ['', [Validators.required]],
    price: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
    comment: ['']
    
    
  });



  constructor(public modalService: ModalService, private fb: FormBuilder, private serviciosService: ServiciosService) { }

  ngOnInit(): void {


    
    
      


     this.serviciosService.getClientes().subscribe(
      (resp: AppResponse<ClienteModel[]>) => {

       
        this.clientes = resp.data;

      });    

          this.serviciosService.getEmpresas().subscribe(
      (resp: AppResponse<EmpresaModel[]>) => {

       
        this.empresas = resp.data;

      }); 

   

    this.serviciosService.getProductos().subscribe(
      (resp: AppResponse<ProductoModel[]>) => {

        for(const i in resp.data){

               this.prodName[i] = resp.data[i].name;  // en lavariable this.serie almaceno todas las series
            
             }  


        this.productos = resp.data;


      });


    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
      
    );

     this.serviciosService.getCotizaciones().subscribe(
      (resp: AppResponse<CotizacionModel[]>) => {

       
        this.cotizaciones = resp.data;

      });

     // aqui validamos que ya se este cargando informacion para mantener los datos de cliente, empresa y no. solicitud
   
      this.solici = sessionStorage.getItem('solicitud');
      this.cliente1 = sessionStorage.getItem('cliente');
      this.compania1 = sessionStorage.getItem('compania');

 
    
        if(Object.keys(this.cotizacion).length > 0){

            this.cantidad = this.cotizacion.quantity.toString();
              this.precio = this.cotizacion.price;
               this.productoss = this.cotizacion.product.name;
               this.comentarios = this.cotizacion.comment;

                  if (this.solici != "" || this.solici != null) {

                    this.comentario = true;

         this.cotizacionForm.setValue({noQuote: this.cotizacionForm.value.noQuote, noRequest: this.solici,  total: this.cotizacionForm.value.total,
          subtotal: this.cotizacionForm.value.subtotal, iva: this.cotizacionForm.value.iva, company: this.compania1, customer: this.cliente1, 
          date: this.cotizacionForm.value.date, time: this.cotizacionForm.value.time, product: this.productoss, price: this.precio, quantity: this.cantidad, comment: this.comentarios});
        

}

        }else{
          if (this.solici != "" || this.solici != null) {

         this.cotizacionForm.setValue({noQuote: this.cotizacionForm.value.noQuote, noRequest: this.solici,  total: this.cotizacionForm.value.total,
          subtotal: this.cotizacionForm.value.subtotal, iva: this.cotizacionForm.value.iva, company: this.compania1, customer: this.cliente1, 
          date: this.cotizacionForm.value.date, time: this.cotizacionForm.value.time, product: this.cotizacionForm.value.product, price: this.cotizacionForm.value.price, quantity: this.cotizacionForm.value.quantity, comment: this.cotizacionForm.value.comment});
        
      }
        }
       
      

      

      
     
      


      


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

   

   GetStats(event: Event) {
    console.log(event);

  
 
    this.comentario = true;
    if(this.comentario){
     
      console.log("Estoy en true");
    }
 
  }  

     guardarCotizacion() {


       // aqui tomamos el valor de la fecha actual para insertarla en la tabla
      let today = new Date();
     this.fechaHoy = this.pipe.transform(today, 'yyyy-MM-dd');

      this.cotizacionForm.value.date = this.fechaHoy;

      // calculo de subtotal, iva y total

      this.subtota = +this.cotizacionForm.value.quantity;
      this.pric = +this.cotizacionForm.value.price;
      this.subtot = this.subtota * this.pric;
      
      this.ivas = this.subtot * .16;
      this.totall = this.subtot + this.ivas;
      
      
      
      this.subtotal = this.subtot.toString();
      this.iva = this.ivas.toString();
      this.total = this.totall.toString();
      this.cotizacionForm.value.subtotal = this.subtotal;
      this.cotizacionForm.value.iva = this.iva;
      this.cotizacionForm.value.total = this.total;

      
      // Coockies para el cliente, empresa y numero de solicitud

      this.solic = sessionStorage.getItem('solicitud');

      if(this.solic == "" || this.solic == null){
      
      this.cliente = this.cotizacionForm.value.customer;
      sessionStorage.setItem('cliente', this.cliente);

      this.solicitud = this.cotizacionForm.value.noRequest;
      sessionStorage.setItem('solicitud', this.solicitud);

         this.company = this.cotizacionForm.value.company;
      sessionStorage.setItem('compania', this.company);

      }else{

        

        this.cotizacionForm.value.noRequest  = this.solici;
        this.cotizacionForm.value.company  = this.compania1;
        this.cotizacionForm.value.customer  = this.cliente1;

      }
      
       if (this.cotizaciones.length  == 0){

         this.cotizacionForm.value.noQuote =  '1';
         sessionStorage.setItem('cotizacion', '1');


      } 

      else{

        this.cot = sessionStorage.getItem('cotizacion'); 

       
           if (this.cot  != null){

        this.cotizacionForm.value.noQuote  = this.cot;

      } else {

           this.numero = (this.cotizaciones[0].noQuote + 1);
           console.log("id", this.numero);
           this.coti = this.numero.toString(); 
           sessionStorage.setItem('cotizacion', this.coti);
           this.cotizacionForm.value.noQuote  = this.coti;
      }

      //  let cotizac: string = this.cotizaciones[0].noQuote;
      //  this.cotiza = this.cotizaciones[0].noQuote + 1; 
      //  this.cot = this.cotiza.toString(); 


    }

    

       this.serviciosService.guardarCotizacion(this.cotizacionForm.value).subscribe(
        repuestos => {
        
         
        swal.fire('Registro Efectuado', 'se realizó el registro correctamente', 'success');
      //  this.cotizacionForm.setValue({product: '', price: '', quantity: ''});
         
        
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );

     

    
  }

    updateCotizacion(): void {

      

      this.cotizacionForm.value.date = this.cotizacion.date;
      this.cotizacionForm.value.noQuote =  this.cotizacion.noQuote.toString();
    //  this.cotizacionForm.value.quantity = this.cotizacion.quantity.toString();
    //  this.cotizacionForm.value.price =  this.cotizacion.price;

      if (this.cotizacionForm.value.product == null || this.cotizacionForm.value.product == "") {

      this.cotizacionForm.value.product = this.cotizacion.product._id;
      
      }else{

        this.cotizacionForm.value.product = this.cotizacion.product._id;
      }

  


         if( (this.cotizacionForm.value.quantity != null || this.cotizacionForm.value.quantity != "") && (this.cotizacionForm.value.price != null || this.cotizacionForm.value.price != "")){

    //   this.cotizacionForm.value.price = this.cotizacion.price.toString();

         

           this.subtota = +this.cotizacionForm.value.quantity;
      this.pric = +this.cotizacionForm.value.price;
      this.subtot = this.subtota * this.pric;
      
      this.ivas = this.subtot * .16;
      this.totall = this.subtot + this.ivas;
      
      
      
      this.subtotal = this.subtot.toString();
      this.iva = this.ivas.toString();
      this.total = this.totall.toString();
      this.cotizacionForm.value.subtotal = this.subtotal;
      this.cotizacionForm.value.iva = this.iva;
      this.cotizacionForm.value.total = this.total;

      }

         if( (this.cotizacionForm.value.quantity === null || this.cotizacionForm.value.quantity === "") && (this.cotizacionForm.value.price != null || this.cotizacionForm.value.price != "")){

    //   this.cotizacionForm.value.price = this.cotizacion.price.toString();

         

          this.cotizacionForm.value.quantity = this.cotizacion.quantity.toString();

           this.subtota = +this.cotizacionForm.value.quantity;
      this.pric = +this.cotizacionForm.value.price;
      this.subtot = this.subtota * this.pric;
      
      this.ivas = this.subtot * .16;
      this.totall = this.subtot + this.ivas;
      
      
      
      this.subtotal = this.subtot.toString();
      this.iva = this.ivas.toString();
      this.total = this.totall.toString();
      this.cotizacionForm.value.subtotal = this.subtotal;
      this.cotizacionForm.value.iva = this.iva;
      this.cotizacionForm.value.total = this.total;

      }

           if( (this.cotizacionForm.value.quantity != null || this.cotizacionForm.value.quantity != "") && (this.cotizacionForm.value.price === null || this.cotizacionForm.value.price === "")){

    //   this.cotizacionForm.value.price = this.cotizacion.price.toString();

        

          this.cotizacionForm.value.price = this.cotizacion.price;

           this.subtota = +this.cotizacionForm.value.quantity;
      this.pric = +this.cotizacionForm.value.price;
      this.subtot = this.subtota * this.pric;
      
      this.ivas = this.subtot * .16;
      this.totall = this.subtot + this.ivas;
      
      
      
      this.subtotal = this.subtot.toString();
      this.iva = this.ivas.toString();
      this.total = this.totall.toString();
      this.cotizacionForm.value.subtotal = this.subtotal;
      this.cotizacionForm.value.iva = this.iva;
      this.cotizacionForm.value.total = this.total;

      }


  
    

       

      

      console.log("Datos", this.cotizacionForm.value);
  
  this.serviciosService.updateCotizacion(this.cotizacionForm.value, this.cotizacion)
    .subscribe(
      json => {
        
        swal.fire('El Artículo Actualizado', 'El Artículo se Actualizó con éxito', 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
  } 

   

     cerrarModal() {
    this.modalService.cerrarModal();
     window.location.reload();
  }

}
