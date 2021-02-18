import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';
import Swal from 'sweetalert2';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../interface/User';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {UserToken} from '../../user-token';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  user: User = {};
  userUpdate: User = {};
  currentUser: User;

  downloadURL: Observable<string>;
  avatar = '';

  constructor(
    private storage: AngularFireStorage,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.user.username = sessionStorage.getItem("AuthUsername");
    this.userService.getUserByUserName(this.user.username).subscribe(value1 => {
      this.user = value1;
    });




  }

  updateUser() {

    if (this.user.username != '') {
      this.userUpdate.firstName = this.user.firstName;
    }
    if (this.user.lastName != '') {
      this.userUpdate.lastName = this.user.lastName;
    }
    if (this.user.phoneNumber != '') {
      this.userUpdate.phoneNumber = this.user.phoneNumber;
    }
    if (this.user.email != '') {
      this.userUpdate.email = this.user.email;
    }
    this.userService.updateUser(this.userUpdate).subscribe(res=>{})

  }
}
