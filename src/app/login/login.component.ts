import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioModel } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: UsuarioModel;

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private snack: MatSnackBar,
    private router: Router,
    private authService: LoginService,
    private fb: FormBuilder,
  ) {
    this.usuario = new UsuarioModel();
  }

  loginReactivo() {
    if (this.loginForm.valid) {
      this.authService.loginReactivo(this.loginForm.value)
        .subscribe((res) => {
          console.log(res);
        })
    }
  }


  login(): void {

    console.log("Usuario", this.usuario.username);
    console.log("Password", this.usuario.password);

    if (this.usuario.username.trim() == '' || this.usuario.username.trim() == null) {
      this.snack.open('El nombre de usuario es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.usuario.password.trim() == '' || this.usuario.password.trim() == null) {
      this.snack.open('La contraseña es requerida !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    //if(this.usuario.username.trim() == 'abc'  && this.usuario.password.trim() == '123'){
    //     this.router.navigate(['/header']);
    //}

    this.authService.login(this.usuario).subscribe(response => {
      //   console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      //this.router.navigate(['/home']);

      console.log("Usuario Registrado", this.authService.usuario);


    }, err => {
      if (err.status == 400) {

        this.snack.open('Usuario o clave incorrectas!!!', 'Aceptar', {
          duration: 4000
        })
      }
    }
    );

  }

}
