import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterPrestationComponent } from './form-register-prestation.component';

describe('FormRegisterPrestationComponent', () => {
  let component: FormRegisterPrestationComponent;
  let fixture: ComponentFixture<FormRegisterPrestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRegisterPrestationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormRegisterPrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
