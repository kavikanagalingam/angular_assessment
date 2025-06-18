import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VendingService} from '../../services/vending.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCard, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-vending-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCard,
    MatCardTitle
  ],
  template: `
    <mat-card-title>Wallet</mat-card-title>
    <div class="buttons">
      @for (coin of coins; track coin) {
        <button  mat-raised-button color="accent" (click)="insert(coin)">
          {{ coinLabel(coin) }}
        </button>
      }
    </div>

    <p>Aktuelles Guthaben: {{ balance() | number:'1.2-2' }} CHF</p>

    <button mat-stroked-button color="warn" class="btn-reset" (click)="resetTransaction()">Zurücksetzen</button>

    @if (message()) {
      <p>{{ message() }}</p>
    }
  `,
  styleUrl: './vending-panel.component.scss'
})
export class VendingPanelComponent {
  private vendingService = inject(VendingService);

  coins = ['TEN_RAPPEN', 'TWENTY_RAPPEN', 'FIFTY_RAPPEN', 'ONE_CHF', 'TWO_CHF'];

  message = signal<string | null>(null);

  balance = this.vendingService.balance;

  constructor() {
    this.loadBalance();
  }

  insert(coin: string) {
    this.vendingService.insertCoin(coin).subscribe({
      next: () => {
        this.message.set(`${this.coinLabel(coin)} eingeworfen`);
        this.loadBalance();
      },
      error: () => {
        this.message.set('Fehler beim Einwerfen der Münze');
      }
    });
  }

  loadBalance() {
    this.vendingService.getBalance().subscribe({
      next: (res) => this.balance.set(res),
      error: () => {
        this.message.set('Fehler beim Abrufen des Guthabens');
      }
    });
  }

  coinLabel(code: string) {
    return {
      TEN_RAPPEN: '10 Rp',
      TWENTY_RAPPEN: '20 Rp',
      FIFTY_RAPPEN: '50 Rp',
      ONE_CHF: '1 CHF',
      TWO_CHF: '2 CHF'
    }[code] ?? code;
  }

  resetTransaction() {
    this.vendingService.resetCoins().subscribe({
      next: () => {
        this.message.set('Münzen wurden zurückgegeben');
        this.loadBalance();
      },
      error: () => {
        this.message.set('Fehler beim Zurücksetzen.')
      }
    })
  }

}
