import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';
import Swal from 'sweetalert2';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../interface/User';
import {TokenStorageService} from '../../auth/token-storage.service';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  user: User;
  success: string;
  fail: string;
  profileForm: FormGroup;
  username: string;
  isUpdate = false;
  isUpdateFailed = false;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  constructor(private userService: UserService,
              private storage: AngularFireStorage,
              private route: ActivatedRoute,
              private routes: Router,
              private fb: FormBuilder,
              private token: TokenStorageService) {}
  ngOnInit(): void {
    this.username = this.token.getUsername();
    this.profileForm = this.fb.group({
      // , [Validators.required, Validators.minLength(5)]
      // , [Validators.required, Validators.minLength(5)]
      // , [Validators.required]
      // , [Validators.required]
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      email: [''],
    });
    // const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserByUserName(this.username)
      .subscribe(result => {
        this.user = result;
        this.profileForm.patchValue(this.user);
        this.success = 'Edit user successfully !';
      }, error => {
        this.fail = 'Edit user fail';
      });
  }
  updateUser(){
    if (this.profileForm.valid) {
      const {value} = this.profileForm;
      const data = {
        ...this.user,
        ...value
      };
      this.userService.updateUser(data)
        .subscribe(result => {
          // console.log('success');
          // this.routes.navigate(['list']);
          this.updateSuccess();
          this.isUpdate  = true;
          this.isUpdateFailed = false;
        }, error => {
          console.log(error);
          this.isUpdate  = false;
          this.isUpdateFailed = true;
        });
    }
  }
  updateSuccess(){
    this.Toast.fire({
      icon: 'success',
      title: 'Cập nhật thành công'
    });
  }
}
