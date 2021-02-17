import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Song} from '../../interface/Song';
import {User} from '../../interface/User';
import {SongService} from '../../service/song.service';
import {SearchService} from '../../service/search.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {UserService} from '../../service/user.service';
import {LikeService} from '../../service/like.service';

@Component({
  selector: 'app-all-song',
  templateUrl: './all-song.component.html',
  styleUrls: ['./all-song.component.css']
})
export class AllSongComponent implements OnInit, OnChanges {

  value: string;
  songList: Song[] = [];
  info: any;
  user: User;
  constructor(private songService: SongService, public searchService: SearchService,
              private tokenService: TokenStorageService,
              private userService: UserService,
              private likeService: LikeService
  ) {
  }
  ngOnInit(): void {
    this.getUserInfor();
    if (this.info.username !== ''){
      this.getUserDetail();
    }
    this.getListSearch();
    this.songService.getAllSongs().subscribe(next => {
      this.songList = next;
    }, error => (this.songList = []));
    this.getUserInfor();
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
  getUserInfor(){
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
    };
  }

  getUserDetail(){
    this.userService.getUserByUserName(this.info.username).subscribe( data =>
    {
      this.user = data;
    }, error =>
      console.log(error));
  }

  onLike( idUser: number, idSong: number) {
    const like = {
      user: idUser
    };
    like.user = this.convertToUser(idUser);
    this.songService.likeSong(like, idSong).subscribe(next => {
      this.getAllSong();
    }, (e) => {
      console.log(e);
    });
  }

  getAllSong(){
    this.songService.getAllSongs().subscribe(next => {
      this.songList = next;
    }, error => (this.songList = []));
  }

  convertToUser( idUser: number){
    const user: any = {
      id: idUser
    };
    return user;
  }
}
