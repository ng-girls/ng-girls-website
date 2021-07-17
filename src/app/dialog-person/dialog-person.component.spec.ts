import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogPersonComponent } from './dialog-person.component';

describe('DialogPersonComponent', () => {
  let component: DialogPersonComponent;
  let fixture: ComponentFixture<DialogPersonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
