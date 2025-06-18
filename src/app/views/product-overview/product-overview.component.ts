import {Component, inject, signal} from '@angular/core';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product.service';
import {ProductCardComponent} from '../product-card/product-card.component';
import {VendingPanelComponent} from '../vending-panel/vending-panel.component';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [
    ProductCardComponent,
    VendingPanelComponent
  ],
  template: `
    <h2>Verfügbare Produkte</h2>
    @if (products().length > 0) {
      @for (product of products(); track product.id) {
        <app-product-card [product]="product" />
      }
    } @else {
      <p>Keine Produkte verfügbar.</p>
    }

    <app-vending-panel />
  `
})
export class ProductOverviewComponent {
  products = signal<Product[]>([]);
  private productService = inject(ProductService);

  constructor() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products.set(data),
      error: () => console.error('Could not load products')
    })
  }
}
