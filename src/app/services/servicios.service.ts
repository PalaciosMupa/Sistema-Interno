import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoginService } from '../services/login.service';
import { ProductoModel } from '../../models/producto.model';
import { ClienteModel } from '../../models/cliente.model';
import { EmpresaModel } from '../../models/empresa.model';
import { CotizacionModel } from '../../models/cotizacion.model';
import { AppResponse } from 'src/models/api-response.model';
import { map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  cotiza: string;
  cotizac: number;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private authService: LoginService) { }





  guardarProducto(body: any) {

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const urlEndpoint = 'https://sistema-interno-back-pepemalpik.vercel.app/products';
    //  const httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // 'Authorization': 'Basic ' + credenciales
    // });
    return this.http.post<any>(urlEndpoint, body, { headers: httpHeaders });

  }

  guardarCliente(body: any) {

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const urlEndpoint = 'https://sistema-interno-back-pepemalpik.vercel.app/customers';
    //  const httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // 'Authorization': 'Basic ' + credenciales
    // });
    return this.http.post<any>(urlEndpoint, body, { headers: httpHeaders });

  }

   enviarPdf () {

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
   this.cotiza = sessionStorage.getItem('cotizacion');
   this.cotizac = +this.cotiza;
   console.log("Paso Dos", this.cotizac);

    const urlEndpoint = 'https://sistema-interno-back-pepemalpik.vercel.app/quotes/sendPdf?noQuote='; 
   
    return this.http.post<any>(`${urlEndpoint}${this.cotizac}`, { headers: httpHeaders });

  }

    guardarCotizacion(body: any) {

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const urlEndpoint = 'https://sistema-interno-back-pepemalpik.vercel.app/quotes';
    //  const httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // 'Authorization': 'Basic ' + credenciales
    // });
    return this.http.post<any>(urlEndpoint, body, { headers: httpHeaders });

  }


  getProductos(): Observable<AppResponse<ProductoModel[]>> {

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    // if (token != null) {
    //   httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    //   const urlEndpoint = 'https://sistema-interno-back-pepemalpik.vercel.app/products';
    //   return this.http.get<ProductoModel[]>(urlEndpoint, { headers: httpHeaders });
    // }

    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    return this.http.get<AppResponse<ProductoModel[]>>(
      `https://sistema-interno-back-pepemalpik.vercel.app/products`, { headers: httpHeaders },
    );

  }

    getClientes(): Observable<AppResponse<ClienteModel[]>> {

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    // if (token != null) {
    //   httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    //   const urlEndpoint = 'https://sistema-interno-back-pepemalpik.vercel.app/products';
    //   return this.http.get<ProductoModel[]>(urlEndpoint, { headers: httpHeaders });
    // }

    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    return this.http.get<AppResponse<ClienteModel[]>>(
      `https://sistema-interno-back-pepemalpik.vercel.app/customers`, { headers: httpHeaders },
    );

  }

   getEmpresas(): Observable<AppResponse<EmpresaModel[]>> {

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    // if (token != null) {
    //   httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    //   const urlEndpoint = 'https://sistema-interno-back-pepemalpik.vercel.app/products';
    //   return this.http.get<ProductoModel[]>(urlEndpoint, { headers: httpHeaders });
    // }

    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    return this.http.get<AppResponse<EmpresaModel[]>>(
      `https://sistema-interno-back-pepemalpik.vercel.app/companies`, { headers: httpHeaders },
    );

  }

    getCotizaciones(): Observable<AppResponse<CotizacionModel[]>> {

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    // if (token != null) {
    //   httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    //   const urlEndpoint = 'https://sistema-interno-back-pepemalpik.vercel.app/products';
    //   return this.http.get<ProductoModel[]>(urlEndpoint, { headers: httpHeaders });
    // }

    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    return this.http.get<AppResponse<CotizacionModel[]>>(
      `https://sistema-interno-back-pepemalpik.vercel.app/quotes`, { headers: httpHeaders },
    );

  }

    getCotizacionesPdf(): Observable<AppResponse<CotizacionModel[]>> {

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    this.cotiza = sessionStorage.getItem('cotizacion');
    this.cotizac = +this.cotiza;
    console.log("id",this.cotizac);
  
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    return this.http.get<AppResponse<CotizacionModel[]>>(
      `https://sistema-interno-back-pepemalpik.vercel.app/quotes/pdf/${this.cotizac}`, { headers: httpHeaders },
    );

  }

  



 

      updateProducto(body: any, producto: ProductoModel): Observable<any> {

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    const urlEndpoint = 'https://sistema-interno-back-pepemalpik.vercel.app/products';   

    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
  return this.http.patch<any>(`${urlEndpoint}/${producto._id}`, body, { headers: httpHeaders }).pipe(
    catchError(e => {

      if (e.status == 400) {
        return throwError(e);
      }

      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}

   updateCotizacion(body: any, cotizacion: CotizacionModel): Observable<any> {

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    const urlEndpoint = 'https://sistema-interno-back-pepemalpik.vercel.app/quotes';   

    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
  return this.http.patch<any>(`${urlEndpoint}/${cotizacion._id}`, body, { headers: httpHeaders }).pipe(
    catchError(e => {

      if (e.status == 400) {
        return throwError(e);
      }

      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}     


 updateCliente(body: any, cliente: ClienteModel): Observable<any> {

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    const urlEndpoint = 'https://sistema-interno-back-pepemalpik.vercel.app/customers';   

    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
  return this.http.patch<any>(`${urlEndpoint}/${cliente._id}`, body, { headers: httpHeaders }).pipe(
    catchError(e => {

      if (e.status == 400) {
        return throwError(e);
      }

      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}   


deleteProducto(producto: ProductoModel): Observable<AppResponse<ProductoModel>>  {
  let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    const urlEndpoint = 'https://sistema-interno-back-pepemalpik.vercel.app/products';   

    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
  return this.http.delete<AppResponse<ProductoModel>>(`${urlEndpoint}/${producto._id}`, { headers: httpHeaders  }).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}  

deleteCotizacion(cotizacion: CotizacionModel): Observable<AppResponse<CotizacionModel>>  {
  let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    const urlEndpoint = 'https://sistema-interno-back-pepemalpik.vercel.app/quotes';   

    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
  return this.http.delete<AppResponse<CotizacionModel>>(`${urlEndpoint}/${cotizacion._id}`, { headers: httpHeaders  }).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}  



deleteCliente(cliente: ClienteModel): Observable<AppResponse<ClienteModel>>  {
  let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    const urlEndpoint = 'https://sistema-interno-back-pepemalpik.vercel.app/customers';   

    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
  return this.http.delete<AppResponse<ClienteModel>>(`${urlEndpoint}/${cliente._id}`, { headers: httpHeaders  }).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}  



}
