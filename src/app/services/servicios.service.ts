import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoginService } from '../services/login.service';
import { ProductoModel } from '../../models/producto.model';
import { AppResponse } from 'src/models/api-response.model';

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




}
