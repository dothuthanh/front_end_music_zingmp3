import { Component, OnInit } from '@angular/core';
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
  user: User;
  currentUser: UserToken;
  updateUserForm: FormGroup;
  downloadURL: Observable<string>;
  avatar = '';

  constructor(
    private storage: AngularFireStorage,
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.updateUserForm = this.fb.group({
      username: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
    });
    this.authService.currentUser.subscribe(value => {
      this.currentUser = value;
      this.userService.getUserByUserName(value.username).subscribe(value1 => {
        this.user = value1;
        this.updateUserForm.setValue({
          username: this.user.username,
          firstName: this.user.fistName,
          lastName: this.user.lastName,
          email: this.user.email,
          phoneNumber: this.user.phoneNumber,
        });
      });
    });
  }

  updateUser() {
    this.user.username = this.updateUserForm.value.username;
    this.user.fistName = this.updateUserForm.value.firstName;
    this.user.lastName = this.updateUserForm.value.lastName;
    this.user.email = this.updateUserForm.value.email;
    this.user.phoneNumber = this.updateUserForm.value.phoneNumber;
    this.user.email = this.updateUserForm.value.email;
    // if (!this.avatar == null) {
    //   this.user.avatar = this.avatar;
    // }
    this.userService.updateUser(this.user).subscribe(() => {
      alert('Cập nhật User thành công!');
      this.router.navigate(['/profile']);
      window.location.reload();
    }, error => {
      alert('Lỗi!');
    });
  }

//   user: User;
//   success: string;
//   fail: string;
//   profileForm: FormGroup;
//   username: string;
//   isUpdate = false;
//   isUpdateFailed = false;
//   Toast = Swal.mixin({
//     toast: true,
//     position: 'top-end',
//     showConfirmButton: false,
//     timer: 3000
//   });
//   constructor(private userService: UserService,
//               private storage: AngularFireStorage,
//               private route: ActivatedRoute,
//               private routes: Router,
//               private fb: FormBuilder,
//               private token: TokenStorageService) {}
//   ngOnInit(): void {
//     this.username = this.token.getUsername();
//     this.profileForm = this.fb.group({
//       // , [Validators.required, Validators.minLength(5)]
//       // , [Validators.required, Validators.minLength(5)]
//       // , [Validators.required]
//       // , [Validators.required]
//       firstName: [''],
//       lastName: [''],
//       phoneNumber: [''],
//       email: [''],
//     });
//     // const id = +this.route.snapshot.paramMap.get('id');
//     this.userService.getUserByUserName(this.username)
//       .subscribe(result => {
//         this.user = result;
//         this.profileForm.patchValue(this.user);
//         this.success = 'Edit user successfully !';
//       }, error => {
//         this.fail = 'Edit user fail';
//       });
//   }
//   updateUser(){
//     if (this.profileForm.valid) {
//       const {value} = this.profileForm;
//       const data = {
//         ...this.user,
//         ...value
//       };
//       this.userService.updateUser(data)
//         .subscribe(result => {
//           // console.log('success');
//           // this.routes.navigate(['list']);
//           this.updateSuccess();
//           this.isUpdate  = true;
//           this.isUpdateFailed = false;
//         }, error => {
//           console.log(error);
//           this.isUpdate  = false;
//           this.isUpdateFailed = true;
//         });
//     }
//   }
//   updateSuccess(){
//     this.Toast.fire({
//       icon: 'success',
//       title: 'Cập nhật thành công'
//     });
//   }
}
