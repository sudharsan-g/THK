import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityassuranceComponent } from './qualityassurance.component';

describe('QualityassuranceComponent', () => {
  let component: QualityassuranceComponent;
  let fixture: ComponentFixture<QualityassuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityassuranceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityassuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
