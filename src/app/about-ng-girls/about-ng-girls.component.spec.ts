import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutNgGirlsComponent } from './about-ng-girls.component';

describe('AboutNgGirlsComponent', () => {
  let component: AboutNgGirlsComponent;
  let fixture: ComponentFixture<AboutNgGirlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutNgGirlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutNgGirlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
