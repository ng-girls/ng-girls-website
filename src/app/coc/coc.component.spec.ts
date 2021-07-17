import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CocComponent } from './coc.component';

describe('CocComponent', () => {
  let component: CocComponent;
  let fixture: ComponentFixture<CocComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
