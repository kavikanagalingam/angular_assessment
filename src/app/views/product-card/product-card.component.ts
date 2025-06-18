import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection:ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <h3>{{ product.name }}</h3>
      <p>Preis: {{ product.price.toFixed(2) }} CHF</p>
      <p>Lager: {{ product.inventory }}</p>

      <button
        [disabled]="product.inventory === 0"
        (click)="onBuy()"
      >
        {{ product.inventory > 0 ? 'Kaufen' : 'Ausverkauft' }}
      </button>
    </div>
  `,
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() buy = new EventEmitter<string>();

  onBuy() {
    this.buy.emit(this.product.id);
  }
}
