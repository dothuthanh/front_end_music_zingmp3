import { Component, OnInit } from '@angular/core';
import {User} from "../../interface/User";
import {Song} from "../../interface/Song";
import {Album} from "../../interface/Album";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SongService} from "../../service/song.service";
import {SearchService} from "../../service/search.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlbumService} from "../../service/album.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-album-list-song',
  templateUrl: './album-list-song.component.html',
  styleUrls: ['./album-list-song.component.css']
})
export class AlbumListSongComponent implements OnInit {
  info: any;
  value = '';
  album: Album;
  songList: Song[] = [];

  constructor(private songService: SongService,
              private searchServe: SearchService,
              private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private albumService: AlbumService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.albumService.getSongByAlbumId(id).subscribe(next => {
      this.album = next;
      this.songList = this.album.songList;
    })
  }
}
