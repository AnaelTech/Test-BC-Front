import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPrestationComponent } from './crud-prestation.component';

describe('CrudPrestationComponent', () => {
  let component: CrudPrestationComponent;
  let fixture: ComponentFixture<CrudPrestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudPrestationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudPrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
