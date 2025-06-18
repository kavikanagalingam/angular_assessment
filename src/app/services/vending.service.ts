import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendingService {
  private http = inject(HttpClient);
  private baseUrl = '/vendingmachine';

  balance = signal<number>(0);

  /**
   * Insert a coin into the vending machine
   * POST /vendingmachine/coin
   */
  insertCoin(coin: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/coin`, { coin });
  }

  /**
   * Get current balance
   * GET /vendingmachine/balance
   */
  getBalance(): Observable<number> {
    return this.http.get<{ amount: number }>(`${this.baseUrl}/balance`).pipe(
      map(res => res.amount));
  }

  refreshBalance() {
    this.getBalance().subscribe({
      next: (res) => this.balance.set(res),
      error: () => console.error('Fehler beim Abrufen des Guhabens')
    })
  }

  /**
   * Buy product by ID
   * GET /vendingmachine/product/{productId}
   */
  buyProduct(productId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/${productId}`).pipe(
      tap(() => this.refreshBalance())
    );
  }

  /**
   * Reset current coins (cancel transaction)
   * DELETE /vendingmachine/coin
   */
  resetCoins(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/coin`).pipe(
      tap(() => this.refreshBalance())
    );
  }
}
