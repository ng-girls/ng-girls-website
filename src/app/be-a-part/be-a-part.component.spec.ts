import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeAPartComponent } from './be-a-part.component';

describe('BeAPartComponent', () => {
  let component: BeAPartComponent;
  let fixture: ComponentFixture<BeAPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeAPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeAPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
