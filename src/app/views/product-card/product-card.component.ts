import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Product} from '../../models/product.model';
import {MatCard, MatCardContent, MatCardModule, MatCardTitle} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCard,
    MatCardTitle,
    MatCardContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>{{ product.name }}</mat-card-title>
      <mat-card-content>
        <p>Preis: {{ product.price.toFixed(2) }} CHF</p>
        <p>Lager: {{ product.inventory }}</p>
      </mat-card-content>
    </mat-card>


    <button mat-raised-button
            color="primary"
            [disabled]="product.inventory === 0"
            (click)="onBuy()">
      {{ product.inventory > 0 ? 'Kaufen' : 'Ausverkauft' }}
    </button>
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
