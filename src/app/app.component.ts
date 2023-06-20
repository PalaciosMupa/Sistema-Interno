import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema';
  autenticado:boolean = false;
  abc:boolean = false;
  token: string = "";
  

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public authService: LoginService) { }

  ngOnInit(): void {

 this.token = sessionStorage.getItem('token'); 
 console.log("Token 2", this.token);
  

  if (this.token != "" || this.token != null ) {
      this.autenticado = true;
    }
  }

  logout(): void {
   
    this.authService.logout();
    this.autenticado = false;
    
    this.router.navigate(['/']);
  }
}
