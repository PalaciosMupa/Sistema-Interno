import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoginService } from '../services/login.service';
import { ProductoModel } from '../../models/producto.model';
import { AppResponse } from 'src/models/api-response.model';
import { map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

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




}
