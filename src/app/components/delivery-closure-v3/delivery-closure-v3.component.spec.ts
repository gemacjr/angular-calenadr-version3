import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryClosureV3Component } from './delivery-closure-v3.component';

describe('DeliveryClosureV3Component', () => {
  let component: DeliveryClosureV3Component;
  let fixture: ComponentFixture<DeliveryClosureV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryClosureV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryClosureV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
