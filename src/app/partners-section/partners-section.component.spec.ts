import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PartnersSectionComponent } from './partners-section.component';

describe('PartnersSectionComponent', () => {
  let component: PartnersSectionComponent;
  let fixture: ComponentFixture<PartnersSectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnersSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
