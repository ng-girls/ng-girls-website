import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeYouComponent } from './see-you.component';

describe('SeeYouComponent', () => {
  let component: SeeYouComponent;
  let fixture: ComponentFixture<SeeYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeYouComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
