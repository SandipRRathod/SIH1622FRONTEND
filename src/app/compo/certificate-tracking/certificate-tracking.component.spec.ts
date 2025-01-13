import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateTrackingComponent } from './certificate-tracking.component';

describe('CertificateTrackingComponent', () => {
  let component: CertificateTrackingComponent;
  let fixture: ComponentFixture<CertificateTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CertificateTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
