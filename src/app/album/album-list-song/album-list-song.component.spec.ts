import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumListSongComponent } from './album-list-song.component';

describe('AlbumListSongComponent', () => {
  let component: AlbumListSongComponent;
  let fixture: ComponentFixture<AlbumListSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumListSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumListSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
