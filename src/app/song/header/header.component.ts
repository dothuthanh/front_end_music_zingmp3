import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../service/search.service';
import {Song} from '../../interface/Song';
import {SongService} from '../../service/song.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {User} from '../../interface/User';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  value: string;
  songList: Song[] = [];
  isSignedUp = false;
  isSignUpFailed = false;
  public info: any;
  user: User;
  constructor(public searchService: SearchService,
              private songService: SongService,
              private tokenService: TokenStorageService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.getUserInfor();
    console.log(this.info.username);
    if (this.info.username !== ''){
      this.getUserDetail();
    }
    if (this.tokenService.getToken()) {
      this.isSignedUp = true;
      this.isSignUpFailed = false;
    }else {
      this.isSignedUp = false;
      this.isSignUpFailed = true;
    }
    this.getUserInfor();
  }
  search(){
    if (this.value !== ''){
      console.log(this.value);
      this.songService.getSongByName(this.value).subscribe( data => {
        this.songList = data;
        this.searchService.changeValue(this.value, this.songList);
        // console.log(this.songList);
      });
    }else {
      this.songService.getAllSongs().subscribe( data => {
        this.songList = data;
        this.searchService.changeValue(this.value, this.songList);
      });
    }
  }
  logout() {
    this.tokenService.signOut();
    this.router.navigate(['']);
    window.location.reload();
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
  async getUserDetail(){
    console.log(this.info.username);
    await this.userService.getUserByUserName(this.info.username).subscribe( data =>
    {
      this.user = data;
    }, error =>
      console.log(error));
  }
}
