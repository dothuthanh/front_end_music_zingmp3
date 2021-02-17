import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SongService} from '../../service/song.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {StyleService} from '../../service/style.service';
import {User} from '../../interface/User';
import Swal from 'sweetalert2';
import {UserService} from '../../service/user.service';
import {TokenStorageService} from '../../auth/token-storage.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  user: User;
  success: string;
  fail: string;
  oldPassword: string;
  newPassword: string;
  isLoggedIn = false;
  isLoginFailed = false;
  updatePasswordForm: FormGroup;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private token: TokenStorageService) {
  }
  ngOnInit(): void {
  }
  onSubmit() {
    this.userService.updatePassword(this.oldPassword, this.newPassword).subscribe(() => {
      this.isLoggedIn = true;
      this.isLoginFailed  = false;
      this.createSuccess();
      // this.router.navigate(['']);
      // window.location.reload();
      this.logout();
      console.log('success');
      }, error => {
      this.isLoginFailed = true;
      this.isLoggedIn = false;
      console.log(error);
    });
  }
  createSuccess(){
    this.Toast.fire({
      icon: 'success',
      title: ' create success '
    });
  }
  createFail(){
    this.Toast.fire({
      icon: 'error',
      title: 'create fail'
    });
  }
  logout() {
    this.token.signOut();
    this.router.navigate(['/login']);
    // window.location.reload();
  }
}
