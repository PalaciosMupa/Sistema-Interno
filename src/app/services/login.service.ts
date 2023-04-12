import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../../models/usuario.model';
import { HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _usuario: UsuarioModel;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get usuario(): UsuarioModel {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as UsuarioModel;
      return this._usuario;
    }
    return new UsuarioModel();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  loginReactivo(body: any) {

    const urlEndpoint = 'https://sistema-interno-back-pepemalpik.vercel.app/auth';
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Basic ' + credenciales
    });
    return this.http.post<any>(urlEndpoint, body, { headers: httpHeaders });

  }


  login(usuario: UsuarioModel): Observable<any> {

    // const urlEndpoint = 'http://localhost:8080/oauth/token';  ng serve --ssl true --ssl-cert "/path/to/file.crt" --ssl-key "/path/to/file.key"
    const urlEndpoint = 'https://sistema-interno-back-pepemalpik.vercel.app/auth';
    //const credenciales = btoa('angularapp' + ':' + '12345');
    const credenciales = btoa('admin@yopmail.com' + ':' + '123123');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });

  }


  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new UsuarioModel();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);

  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role): boolean {
    if (this.usuario != null && this.usuario.roles != null && this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }


}
