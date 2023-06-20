import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { VerComponent } from './ver/ver.component';
import { GenerarComponent } from './generar/generar.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductoComponent } from './generar/producto/producto.component';
import { ProductosComponent } from './productos/productos.component';
import { AgregarComponent } from './productos/agregar/agregar.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClieComponent } from './clientes/clie/clie.component';
import { PdfComponent } from './generar/pdf/pdf.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VerComponent,
    GenerarComponent,
    LoginComponent,
    DashboardComponent,
    ProductoComponent,
    ProductosComponent,
    AgregarComponent,
    ClientesComponent,
    ClieComponent,
    PdfComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    PdfViewerModule,
    MatCheckboxModule,
  ],
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
