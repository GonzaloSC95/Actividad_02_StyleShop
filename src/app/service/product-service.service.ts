import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
/**Desarrollar un elemento ProductService para
 * comunicar e hidratar los datos de los componentes y la API-REST. */
export class ProductService {
  //Atributos
  private apiUrl = 'https://jsonblob.com/api/jsonBlob/1328468607658811392';

  //Metodos
  // GET: Obtener todos los productos
  async getProductos(): Promise<Producto[]> {
    const productos: Producto[] = [];
    const response = await fetch(this.apiUrl);
    const data = await response.json();
    data.forEach((element: any) => {
      productos.push(element as Producto);
    });
    return productos;
  }

  // PUT: Actualizar un producto existente
  async updateProductos(productosPost: Producto[]): Promise<Producto[]> {
    const url = `${this.apiUrl}`;
    const productos: Producto[] = [];
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(productosPost),
    });
    const data = await response.json();
    data.forEach((element: any) => {
      productos.push(element as Producto);
    });
    return productos;
  }
}
