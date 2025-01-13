import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPDComponent } from './edit-pd.component';

describe('EditPDComponent', () => {
  let component: EditPDComponent;
  let fixture: ComponentFixture<EditPDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
