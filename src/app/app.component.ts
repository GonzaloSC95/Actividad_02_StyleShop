import { Component, inject } from '@angular/core';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { Producto } from './models/producto';
import { ProductService } from './service/product-service.service';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsListComponent, ProductFormComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  //Titulo de la página
  title = 'StyleShop';

  //Inyección del servicio
  private productService = inject(ProductService);

  //Lista de productos
  productos: Producto[];
  categories: string[];
  filterData: any;

  constructor() {
    this.productos = [];
    this.categories = ['hombre', 'mujer', 'niño'];
    this.filterData = {
      name: '',
      category: '',
      price: '',
      active: -1,
    };
  }

  ngOnInit(): void {
    this.productService.getProductos().then((productos) => {
      this.productos = productos;
    });
  }

  onSubmit(filterForm: NgForm) {
    //Parseamos el producto
    const filter = filterForm.value;

    //Obtenemos todos los productos
    this.productService.getProductos().then((productos) => {
      this.productos = productos;

      //Filtrar por nombre
      if (filter.name) {
        this.productos = this.productos.filter((p) =>
          p.name.toLowerCase().includes(filter.name.toLowerCase())
        );
      }

      //Filtrar por categoría
      if (filter.category) {
        this.productos = this.productos.filter(
          (p) => p.category.toLowerCase() == filter.category.toLowerCase()
        );
      }

      //Filtrar por precio
      if (filter.price) {
        filter.price = parseFloat(filter.price.replace(',', '.'));
        this.productos = this.productos.filter((p) => p.price == filter.price);
      }

      //Filtrar por estado
      if (filter.active != -1) {
        filter.active = filter.active == 1 ? true : false;
        this.productos = this.productos.filter(
          (p) => p.active == filter.active
        );
      }

      //Reseteamos el formulario
      filterForm.resetForm({ name: '', category: '', price: '', active: -1 });
    });
  }
}
