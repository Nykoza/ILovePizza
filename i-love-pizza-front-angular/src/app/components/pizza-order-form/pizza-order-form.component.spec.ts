import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaOrderFormComponent } from './pizza-order-form.component';

describe('PizzaOrderFormComponent', () => {
  let component: PizzaOrderFormComponent;
  let fixture: ComponentFixture<PizzaOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaOrderFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PizzaOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
