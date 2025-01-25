import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Producto } from '../../models/producto';
import { ProductService } from '../../service/product-service.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
/**Desarrollar un componente ProductForm que contenga un formulario ReactiveForm
 * con validadores para dar de alta un nuevo producto, este producto debe verse en la lista cuando se da de alta. */
export class ProductFormComponent {
  //Atributos
  productForm: FormGroup;

  //Inyección del servicio
  private productService = inject(ProductService);

  //Lista de productos
  @Input() productos: Producto[] = [];
  @Input() categories: string[] = [];

  //Constructor
  constructor() {
    this.productForm = new FormGroup(
      {
        name: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        price: new FormControl(0, [Validators.required, Validators.min(0)]),
        category: new FormControl(null, [Validators.required]),
        image: new FormControl(null, [Validators.required]),
        active: new FormControl(true),
      },
      []
    );
  }

  /**Método para dar de alta un nuevo producto*/
  onSubmit(): void {
    if (this.productForm.valid) {
      //Reiniciamos la lista de productos
      console.log('1. Productos:', this.productos);
      this.productService.getProductos().then((productos) => {
        //Recargamos la lista de productos
        this.productos = productos;
        //Añadimos el nuevo producto a la lista y actualizamos los productos en el servicio
        const newProduct: Producto = this.productForm.value;
        newProduct._id = this.generateId();
        this.productos.push(newProduct);
        this.productService.updateProductos(this.productos).then(() => {
          //Recargamos la página
          window.location.reload();
        });
      });
    }
  }

  /*Método para generar un id único para cada producto*/
  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
