import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendingService {
  private http = inject(HttpClient);
  private baseUrl = '/vendingmachine';

  /**
   * Insert a coin into the vending machine
   * POST /vendingmachine/coin
   */
  insertCoin(amount: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/coin`, {amount});
  }

  /**
   * Get current balance
   * GET /vendingmachine/balance
   */
  getBalance(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/balance`);
  }

  /**
   * Buy product by ID
   * GET /vendingmachine/product/{productId}
   */
  buyProduct(productId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/${productId}`);
  }

  /**
   * Reset current coins (cancel transaction)
   * DELETE /vendingmachine/coin
   */
  resetCoins(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/coin`);
  }

}
