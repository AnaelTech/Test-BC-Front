import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterArticleComponent } from './form-register-article.component';

describe('FormRegisterComponent', () => {
  let component: FormRegisterArticleComponent;
  let fixture: ComponentFixture<FormRegisterArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRegisterArticleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormRegisterArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
