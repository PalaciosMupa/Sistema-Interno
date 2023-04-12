import { EmpresaModel } from './empresa.model';
import { ClienteModel } from './cliente.model';
import { ProductoModel } from './producto.model';

export class CotizacionModel{
  id: number;
  Cotizacion: number;
  solicitud: number;
  fecha: string;
  hora: string;
  precio: number;
  cantidad: number;
  serie:string;
  expiracion:string;

  empresa: EmpresaModel;
  cliente: ClienteModel;
  producto: ProductoModel;

}