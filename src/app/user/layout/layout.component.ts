import { Component, OnInit } from '@angular/core';
import {Song} from '../../interface/Song';
import {SongService} from '../../service/song.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  songList: Song[] = [];
  constructor(private songService: SongService) { }

  ngOnInit(): void {
  }

}
