import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product.model';
import {map, Observable, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = '/products';

  /**
   * Get all current Products
   * GET /products
   */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(this.baseUrl).pipe(
      map(response => response.products)
    );
  }

  /**
   * Get a specific product identified by productId
   * @param id
   * GET /products/{id}
   */
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  // CRUD for later
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
