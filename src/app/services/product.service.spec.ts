import {TestBed} from '@angular/core/testing';

import {ProductService} from './product.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {Product} from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all products', () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Coke', price: 2.5, inventory: 10 },
      { id: '2', name: 'Pepsi', price: 2.0, inventory: 5 }
    ];

    service.getAllProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('/products');
    expect(req.request.method).toBe('GET');
    req.flush({ products: mockProducts });
  });

  it('should fetch a product by ID', () => {
    const mockProduct: Product = { id: '1', name: 'Coke', price: 2.5, inventory: 10 };

    service.getProductById('1').subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });
});
