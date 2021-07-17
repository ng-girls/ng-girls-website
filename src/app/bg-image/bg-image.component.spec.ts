import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BgImageComponent } from './bg-image.component';

describe('BgImageComponent', () => {
  let component: BgImageComponent;
  let fixture: ComponentFixture<BgImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BgImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
