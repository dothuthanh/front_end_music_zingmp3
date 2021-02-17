import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenBarComponent } from './listen-bar.component';

describe('ListenBarComponent', () => {
  let component: ListenBarComponent;
  let fixture: ComponentFixture<ListenBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListenBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
