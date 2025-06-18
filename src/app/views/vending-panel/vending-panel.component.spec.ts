import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendingPanelComponent } from './vending-panel.component';

describe('VendingPanelComponent', () => {
  let component: VendingPanelComponent;
  let fixture: ComponentFixture<VendingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendingPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
