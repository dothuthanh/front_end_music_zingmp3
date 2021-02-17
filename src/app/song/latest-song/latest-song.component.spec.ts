import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestSongComponent } from './latest-song.component';

describe('LatestSongComponent', () => {
  let component: LatestSongComponent;
  let fixture: ComponentFixture<LatestSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
