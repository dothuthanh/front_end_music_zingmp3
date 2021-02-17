import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAblumSongComponent } from './add-ablum-song.component';

describe('AddAblumSongComponent', () => {
  let component: AddAblumSongComponent;
  let fixture: ComponentFixture<AddAblumSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAblumSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAblumSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
