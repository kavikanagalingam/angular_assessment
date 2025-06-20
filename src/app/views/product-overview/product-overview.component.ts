import {Component, inject, signal} from '@angular/core';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product.service';
import {ProductCardComponent} from '../product-card/product-card.component';
import {VendingPanelComponent} from '../vending-panel/vending-panel.component';
import {VendingService} from '../../services/vending.service';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [
    ProductCardComponent,
    VendingPanelComponent
  ],
  template: `
    <div class="layout">
      <div class="product-grid">
        <h2>Vending Machine</h2>
        @if (products().length > 0) {
          <div class="grid">
            @for (product of products(); track product.id) {
              <app-product-card [product]="product" (buy)="onBuy($event)"/>
            }
          </div>
        } @else {
          <p>Keine Produkte verfügbar.</p>
        }
      </div>
      <app-vending-panel class="wallet-panel"/>
    </div>
  `,
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent {
  products = signal<Product[]>([]);
  message = signal<string | null>(null);

  private productService = inject(ProductService);
  private vendingService = inject(VendingService);
  readonly MAX_SLOTS = 25;

  slots = signal<(Product | null)[]>([])

  constructor() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products.set(data),
      error: () => console.error('Fehler beim Laden der Produkte')
    })
  }

  onBuy(productId: string) {
    this.vendingService.buyProduct(productId).subscribe({
      next: () => {
        this.message.set('Produkt erfolgreich gekauft!');
        this.loadProducts();
        this.vendingService.refreshBalance();
      },
      error: () => {
        this.message.set('Kauf fehlgeschlagen (z.B. Guthaben zu niedrig oder Produkt leer)')
      }
    })
  }


}
