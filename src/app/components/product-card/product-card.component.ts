import { Component, inject, Input } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductService } from '../../service/product-service.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
/**Desarrollar un componente ProductCard en el que se muestre la información del producto,
 * desde este componente se debe de poder eliminar el producto de la lista. */
export class ProductCardComponent {
  //Atributos
  @Input() producto!: Producto;
  @Input() productos!: Producto[];

  //Inyección del servicio
  private productService = inject(ProductService);

  eliminarProducto(id: string): void {
    //Actualizamos la lista en el servicio
    this.productService.getProductos().then((productos) => {
      //Actualizamos la lista de productos
      this.productos = productos;

      //Eliminamos el producto de la lista
      this.productos.forEach((producto, index) => {
        if (producto._id === id) {
          this.productos.splice(index, 1);
        }
      });

      this.productService.updateProductos(this.productos).then(() => {
        //Recargamos la página
        window.location.reload();
      });
    });
  }
}
