import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditPrestationComponent } from './form-edit-prestation.component';

describe('FormEditComponent', () => {
  let component: FormEditPrestationComponent;
  let fixture: ComponentFixture<FormEditPrestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditPrestationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormEditPrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
