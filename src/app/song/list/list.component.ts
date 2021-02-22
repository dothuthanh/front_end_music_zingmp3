import { Component, OnInit } from '@angular/core';
import {SongService} from '../../service/song.service';
import {Song} from '../../interface/Song';
import {SearchService} from '../../service/search.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from '../../../assets/sweetalert2/sweetalert2.min.js';
import {AlbumService} from '../../service/album.service';
import {Album} from '../../interface/Album';
import {User} from '../../interface/User';
import {TokenStorageService} from '../../auth/token-storage.service';
import {UserService} from '../../service/user.service';
import {async} from '@angular/core/testing';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  value = '';
  songList: Song[] = [];
  albumList: Album[] = [];
  public info: any;
  user: User;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  constructor(private songService: SongService,
              private searchServe: SearchService,
              private router: Router,
              private route: ActivatedRoute,
              private albumService: AlbumService,
              private tokenService: TokenStorageService,
              private userService: UserService) { }

  async ngOnInit() {
    this.getUserInfor();
    if (this.info.username !== ''){
      this.getUserDetail()
        .then(res => {
          return this.songService.getAllSongByUserId(res.id).toPromise();
        })
        .then(result => {
          this.songList = result;
        })
      ;
    }
    console.log(this.songList);
  }
  searching(){
    // if (this.value !== ''){
    //   this.songList = this.songList.filter( res => {
    //     return res.name.toLocaleLowerCase().match(this.value.toLocaleLowerCase());
    //   });
    // }else if (this.value === ''){
    //   this.ngOnInit();
    // }
  }
  delete(id: number) {
    this.songService.deleteSong(id).subscribe( () => {
      this.deleteSuccess();
      this.getAllSong();
      // this.router.getCurrentNavigation();
      // this.router.navigate(['/'], {relativeTo: this.route}).then(r => console.log(r));
    }, error => {
      console.log('delete failed');
    });
  }
  getAllSong(){
    this.getUserInfor();
    if (this.info.username !== ''){
      this.getUserDetail()
        .then(res => {
          return this.songService.getAllSongByUserId(res.id).toPromise();
        })
        .then(result => {
          this.songList = result;
        })
      ;
    }
  }

  deleteSuccess(){
    this.Toast.fire({
      icon: 'success',
      title: 'Xóa thành công'
    });
  }
  getUserInfor(){
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      // authorities: this.token.getAuthorities()
    };
    // console.log(this.info);
    // this.accessToken = this.token.getToken();
  }
  // async getUserDetail(){
  //   await this.userService.getUserByUserName(this.info.username).subscribe( data =>
  //   {
  //     this.user = data;
  //     console.log(this.user);
  //   }, error =>
  //     console.log(error));
  // }

  getUserDetail(){
    return this.userService.getUserByUserName(this.info.username).toPromise();
  }
}
