import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductService } from '../../service/product-service.service';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
/**Desarrollar un componente ProductsList 
 * en el que se listen todos los productos de la API.*/
export class ProductsListComponent {

  //Lista de productos
  @Input() productos: Producto[] = [];
  @Input() categories: string[] = [];


}
