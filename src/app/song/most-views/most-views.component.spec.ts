import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostViewsComponent } from './most-views.component';

describe('MostViewsComponent', () => {
  let component: MostViewsComponent;
  let fixture: ComponentFixture<MostViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
