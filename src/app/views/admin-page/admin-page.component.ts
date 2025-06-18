import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule],
  template: `
    <h2>Produktverwaltung</h2>

    @if (products().length > 0) {
      <div class="product-list">
        @for (product of products(); track product.id) {
          <mat-card class="product-item">
            <mat-card-title>{{ product.name }}</mat-card-title>
            <mat-card-content>
              <p>Preis: {{ product.price.toFixed(2) }} CHF</p>
              <p>Bestand: {{ product.inventory }}</p>
            </mat-card-content>
            <button mat-stroked-button color="primary">Bearbeiten</button>
            <button mat-stroked-button color="warn">Löschen</button>
          </mat-card>
        }
      </div>
    } @else {
      <p>Keine Produkte gefunden.</p>
    }
  `,
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  private productService = inject(ProductService);
  products = signal<Product[]>([]);

  constructor() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (res) => this.products.set(res),
      error: () => console.error('Fehler beim Laden der Produkte')
    });
  }
}
