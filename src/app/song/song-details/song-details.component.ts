import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SongService} from '../../service/song.service';
import {Song} from '../../interface/Song';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.css']
})
export class SongDetailsComponent implements OnInit {
  song: Song;
  constructor(
    private route: ActivatedRoute,
    private songService: SongService
  ) {}

  async ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    await this.songService.getSongById(id).toPromise()
      .then(res => {
        console.log(res);
        this.song = res;
      })
      .catch(error => console.log(error));
  }
}
