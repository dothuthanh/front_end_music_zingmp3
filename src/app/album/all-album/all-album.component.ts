import { Component, OnInit } from '@angular/core';
import {User} from "../../interface/User";
import {Album} from "../../interface/Album";
import {Song} from "../../interface/Song";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SongService} from "../../service/song.service";
import {SearchService} from "../../service/search.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlbumService} from "../../service/album.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {UserService} from "../../service/user.service";
import Swal from '../../../assets/sweetalert2/sweetalert2.min.js';

@Component({
  selector: 'app-all-album',
  templateUrl: './all-album.component.html',
  styleUrls: ['./all-album.component.css']
})
export class AllAlbumComponent implements OnInit {
  userCurrent: User;
  info: any;
  value = '';
  album: Album;
  songList: Song[] = [];
  albumList: Album[] = [];
  albumForm: FormGroup;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  constructor(private songService: SongService,
              private searchServe: SearchService,
              private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private albumService: AlbumService,
              private tokenService: TokenStorageService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getUserInfor();
    if (this.info.username !== ''){
      this.getUserDetail()
        .then(res => {
          return this.albumService.getAllAlbumByUserId(res.id).toPromise()
        })
        .then(result => {
          this.albumList = result;
        })
      ;
    }
  }

  getSongAlbum(id: number){
    this.albumService.getSongByAlbumId(id).subscribe(
      next => {
        this.album = next;
        this.songList = this.album.songList;
        console.log(this.songList);
      }
    )
  }

  convertToSong(array){
    for(let i = 0; i < array.length; i++){
      array[i] = {
        id: array[i]
      }
    }
    return array;
  }

  getUserInfor(){
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
    };
  }

  getUserDetail(){
    return this.userService.getUserByUserName(this.info.username).toPromise();
  }

  deleteAlbum(id :number){
    this.albumService.deleteAlbum(id).subscribe( () => {
      this.deleteSuccess();
      this.getAllSong();
    }, error => {
      console.log('delete failed');
    });
  }

  deleteSuccess(){
    this.Toast.fire({
      icon: 'success',
      title: 'Xóa thành công'
    });
  }

  getAllSong(){
    this.getUserInfor();
    if (this.info.username !== ''){
      this.getUserDetail()
        .then(res => {
          return this.albumService.getAllAlbumByUserId(res.id).toPromise()
        })
        .then(result => {
          this.albumList = result;
        })
      ;
    }
  }
}
