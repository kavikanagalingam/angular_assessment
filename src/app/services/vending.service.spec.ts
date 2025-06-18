import {TestBed} from '@angular/core/testing';

import {VendingService} from './vending.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';

describe('VendingService', () => {
  let service: VendingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(VendingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should insert coin', (done) => {
    service.insertCoin('ONE_CHF').subscribe({
      next: (res) => {
        done();
      }
    });

    const req = httpMock.expectOne('/vendingmachine/coin');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({coin: 'ONE_CHF'});
    req.flush(null);
  });

  it('should get current balance', () => {
    service.getBalance().subscribe(balance => {
      expect(balance).toBe(4.4);
    });

    const req = httpMock.expectOne('/vendingmachine/balance');
    expect(req.request.method).toBe('GET');
    req.flush({amount: 4.4});
  });

  it('should refresh balance (signal should update)', () => {
    service.refreshBalance();

    const req = httpMock.expectOne('/vendingmachine/balance');
    req.flush({amount: 3.5});

    expect(service.balance()).toBe(3.5);
  });

  it('should buy product and refresh balance', () => {
    service.buyProduct('42').subscribe();

    const buyReq = httpMock.expectOne('/vendingmachine/product/42');
    expect(buyReq.request.method).toBe('GET');
    buyReq.flush({});

    const balanceReq = httpMock.expectOne('/vendingmachine/balance');
    balanceReq.flush({amount: 1.0});
    expect(service.balance()).toBe(1.0);
  });

  it('should reset coins and refresh balance', () => {
    service.resetCoins().subscribe();

    const resetReq = httpMock.expectOne('/vendingmachine/coin');
    expect(resetReq.request.method).toBe('DELETE');
    resetReq.flush(null);

    const balanceReq = httpMock.expectOne('/vendingmachine/balance');
    balanceReq.flush({amount: 0});
    expect(service.balance()).toBe(0);
  });
});
