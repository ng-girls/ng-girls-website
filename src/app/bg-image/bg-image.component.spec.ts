import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgImageComponent } from './bg-image.component';

describe('BgImageComponent', () => {
  let component: BgImageComponent;
  let fixture: ComponentFixture<BgImageComponent>;

  beforeEach(async(() => {
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
