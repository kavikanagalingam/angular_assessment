import {Component, inject, signal} from '@angular/core';
import {VendingService} from '../../services/vending.service';

@Component({
  selector: 'app-vending-panel',
  standalone: true,
  imports: [],
  template: `
    <h3>Münzeinwurf</h3>
    <div class="buttons">
      @for (coin of coins; track coin) {
        <button (click)="insert(coin)">
          {{ coinLabel(coin) }}
        </button>
      }
    </div>

    @if (message()) {
      <p>{{ message() }}</p>
    }
  `,
  styleUrl: './vending-panel.component.scss'
})
export class VendingPanelComponent {
  private vendingService = inject(VendingService);
  message = signal<string | null>(null);

  coins = [0.1, 0.2, 0.5, 1.0, 2.0]

  insert(amount: number) {
    this.vendingService.insertCoin(amount).subscribe({
      next: () => {
        this.message.set(` ${this.coinLabel(amount)} CHF eingeworfen`)
      },
      error: () => {
        this.message.set(`Fehler beim Einwerfen der Münze`)
      }
    })
  }

  coinLabel(value: number) {
    return value < 1 ? `${value * 100} Rp` : `${value} CHF`;
  }
}
