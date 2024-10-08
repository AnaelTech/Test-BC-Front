import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudOrderComponent } from './crud-order.component';

describe('CrudOrderComponent', () => {
  let component: CrudOrderComponent;
  let fixture: ComponentFixture<CrudOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
