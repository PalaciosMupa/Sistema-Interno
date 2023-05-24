import { EmpresaModel } from './empresa.model';
import { ClienteModel } from './cliente.model';
import { ProductoModel } from './producto.model';

export class CotizacionModel{
  _id: number;
  noQuote: number;
  noRequest: string;
  date: string;
  hora: string;
  time: number;
  quantity: number;
  price: string;
  total: number;
  subtotal: number;
  iva: number;
 // serie:string;
 // expiracion:string;

  company: EmpresaModel;
  customer: ClienteModel;
  product: ProductoModel;

}