import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingProductlstComponent } from './landing-productlst.component';

describe('LandingProductlstComponent', () => {
  let component: LandingProductlstComponent;
  let fixture: ComponentFixture<LandingProductlstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingProductlstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingProductlstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
