// import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
// import {Song} from '../../interface/Song';
// import {SongService} from '../../service/song.service';
// import {SearchService} from '../../service/search.service';
// import {User} from "../../interface/User";
// import {UserService} from "../../service/user.service";
//
// @Component({
//   selector: 'app-most-views',
//   templateUrl: './most-views.component.html',
//   styleUrls: ['./most-views.component.css']
// })
// export class MostViewsComponent implements OnInit, OnChanges {
//
//   value: string;
//   // songList: Song[] = [];
//   mostViewSong: Song[] = [];
//   info: any;
//   user: User;
//   constructor(private songService: SongService,
//               public searchService: SearchService,
//               private userService: UserService) {
//   }
//   ngOnInit(): void {
//     if (this.info.username !== ''){
//       this.getUserDetail();
//     }
//     // this.songService.getAllSongs().subscribe(next => {
//     //   this.songList = next;}, error => (this.songList = []));
//     // await this.getVale();
//     // this.getListSearch();
//     this.songService.getMostViewSong().subscribe(next => {
//       this.mostViewSong = next;
//     }, error => (this.mostViewSong = []));
//   }
//   // getListSearch(){
//   //   this.searchService.list.subscribe( data => {
//   //     this.songList = data;
//   //     console.log(this.songList); }, error => {
//   //     console.log(error);
//   //   });
//   // }
//   ngOnChanges(changes: SimpleChanges): void {
//     console.log(changes);
//   }
//
//   onLike( idUser: number, idSong: number){
//     console.log(idUser);
//     const like = {
//       user: idUser
//     };
//     console.log(like);
//     like.user = this.convertToUser(idUser);
//     this.songService.likeSong(like, idSong).subscribe(next => {
//       this.getAllMostViewSong();
//       console.log(idSong);
//       console.log(next);
//     }, (e) => {
//       console.log(e);
//     });
//   }
//   getAllMostViewSong(){
//     this.songService.getMostViewSong().subscribe(next => {
//       this.mostViewSong = next;
//     }, error => (this.mostViewSong = []));
//   }
//   getUserDetail(){
//     this.userService.getUserByUserName(this.info.username).subscribe( data =>
//     {
//       this.user = data;
//     }, error =>
//       console.log(error));
//   }
//   convertToUser( idUser: number){
//     const user: any = {
//       id: idUser
//     };
//     return user;
//   }
// }
import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Song} from '../../interface/Song';
import {SongService} from '../../service/song.service';
import {SearchService} from '../../service/search.service';
import {UserService} from '../../service/user.service';
import {User} from '../../interface/User';
import {TokenStorageService} from '../../auth/token-storage.service';
@Component({
  selector: 'app-most-views',
  templateUrl: './most-views.component.html',
  styleUrls: ['./most-views.component.css']
})
export class MostViewsComponent implements OnInit, OnChanges {
  value: string;
  songList: Song[] = [];
  mostViewSong: Song[] = [];
  info: any;
  user: User;
  constructor(private songService: SongService,
              public searchService: SearchService,
              private tokenService: TokenStorageService,
              private userService: UserService) {
  }
  ngOnInit(): void {
    this.getUserInfor();
    if (this.info.username !== ''){
      this.getUserDetail();
    }
    this.getListSearch();
    this.songService.getMostViewSong().subscribe(next => {
      this.mostViewSong = next;
    }, error => (this.mostViewSong = []));
  }
  getListSearch(){
    this.searchService.list.subscribe( data => {
      this.songList = data;
      console.log(this.songList); }, error => {
      console.log(error);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  onLike( idUser: number, idSong: number){
    console.log(idUser);
    const like = {
      user: idUser
    };
    console.log(like);
    like.user = this.convertToUser(idUser);
    this.songService.likeSong(like, idSong).subscribe(next => {
      this.getAllMostViewSong();
      // this.getAllSong();
      console.log(idSong);
      console.log(next);
    }, (e) => {
      console.log(e);
    });
  }

  getAllMostViewSong(){
    this.songService.getMostViewSong().subscribe(next => {
      this.mostViewSong = next;
    }, error => (this.mostViewSong = []));
  }

  getUserDetail(){
    this.userService.getUserByUserName(this.info.username).subscribe( data =>
    {
      this.user = data;
    }, error =>
      console.log(error));
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

  convertToUser( idUser: number){
    const user: any = {
      id: idUser
    };
    return user;
  }
}
