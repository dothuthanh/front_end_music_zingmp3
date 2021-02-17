import { Component, OnInit } from '@angular/core';
import {SignUpInfo} from '../interface/sigup-info';
import {AuthService} from '../auth/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.signupInfo = new SignUpInfo(
      // this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
      this.form.firstName,
      this.form.lastName,
      this.form.phoneNumber
    );
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        // this.router.navigate(['/song']);
      }, error => {
        console.log(error);
        // this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
        this.isSignedUp = false;
      }
    );
  }
}
