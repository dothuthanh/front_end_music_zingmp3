import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../interface/User';
import {UserService} from '../../service/user.service';
import {TokenStorageService} from '../../auth/token-storage.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  info: any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private tokenService: TokenStorageService
  ) {}
  async ngOnInit() {
    await this.getUserInfor();
    console.log(this.info.username);
    if (this.info.username !== ''){
      console.log('day roi');
      this.getUserDetail();
    }
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
  getUserDetail(){
    this.userService.getUserByUserName(this.info.username).subscribe( data =>
    {
      this.user = data;
    }, error =>
      console.log(error));
  }
}
