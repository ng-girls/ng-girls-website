import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorkshopsHomeComponent } from './workshops-home.component';

describe('WorkshopsHomeComponent', () => {
  let component: WorkshopsHomeComponent;
  let fixture: ComponentFixture<WorkshopsHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
