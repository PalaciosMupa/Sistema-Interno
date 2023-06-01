import { Component, OnInit, Input  } from '@angular/core';
import { PdfService } from './pdf.service';
import { CotizacionModel } from '../../../models/cotizacion.model';
import { ServiciosService } from '../../services/servicios.service';
import { AppResponse } from 'src/models/api-response.model';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent {

  @Input() cotizacion: CotizacionModel;
  titulo: string = "Cotización";
   cotiza: CotizacionModel[];
   cot: string;
  src: any = null;
  path: string= "https://sistema-interno-back-pepemalpik.vercel.app/quotes/pdf?noQuote=";

 constructor(public pdfService: PdfService, private serviciosService: ServiciosService) { }

 ngOnInit(): void {
   
   this.serviciosService.getCotizacionesPdf().subscribe(
      (resp: AppResponse<CotizacionModel[]>) => {

       
        this.cotiza = resp.data;

      });

   this.cot = sessionStorage.getItem('cotizacion'); 

  // this.src = this.path;
   this.src =`${this.path}${this.cot}`; 

 }

  cerrarPdf() {
    this.pdfService.cerrarPDF();
    window.location.reload();
    
  }

}
