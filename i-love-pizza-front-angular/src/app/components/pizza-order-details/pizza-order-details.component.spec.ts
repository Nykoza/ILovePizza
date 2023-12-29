import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaOrderDetailsComponent } from './pizza-order-details.component';

describe('PizzaOrderDetailsComponent', () => {
  let component: PizzaOrderDetailsComponent;
  let fixture: ComponentFixture<PizzaOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaOrderDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PizzaOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
