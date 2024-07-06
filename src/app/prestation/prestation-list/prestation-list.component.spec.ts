import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationListComponent } from './prestation-list.component';

describe('PrestationListComponent', () => {
  let component: PrestationListComponent;
  let fixture: ComponentFixture<PrestationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrestationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
