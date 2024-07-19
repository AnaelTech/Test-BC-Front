import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditOrderComponent } from './form-edit-order.component';

describe('FormEditOrderComponent', () => {
  let component: FormEditOrderComponent;
  let fixture: ComponentFixture<FormEditOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormEditOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
