import { Component, OnInit } from '@angular/core';
import {Song} from "../../interface/Song";
import {SongService} from "../../service/song.service";

@Component({
  selector: 'app-listen-bar',
  templateUrl: './listen-bar.component.html',
  styleUrls: ['./listen-bar.component.css']
})
export class ListenBarComponent implements OnInit {
  songLike: Song[] = [];
  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.songService.getSongHaveMostLike().subscribe(next => {
      console.log(this.songLike);
      this.songLike = next;
    }, error => (console.log(error)));
  }
}
