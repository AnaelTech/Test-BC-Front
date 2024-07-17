import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditArticleComponent } from './form-edit-article.component';

describe('FormEditComponent', () => {
  let component: FormEditArticleComponent;
  let fixture: ComponentFixture<FormEditArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditArticleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormEditArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
