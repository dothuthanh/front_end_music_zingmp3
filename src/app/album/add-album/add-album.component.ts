import { Component, OnInit } from '@angular/core';
import Swal from '../../../assets/sweetalert2/sweetalert2.min.js';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlbumService} from "../../service/album.service";
import {Album} from "../../interface/Album";
import {User} from "../../interface/User";
import {TokenStorageService} from "../../auth/token-storage.service";
import {UserService} from "../../service/user.service";
@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {
  userCurrent: User;
  info: any;
  albumForm: FormGroup;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  constructor(private albumServie: AlbumService,
              private fb: FormBuilder,
              private tokenService: TokenStorageService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getUserInfor();
    // console.log(this.info.username);
    if (this.info.username !== ''){
      this.getUserDetail();
    }
    this.albumForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  async onSubmit(){
    const {value} = this.albumForm;
    const album: Album = {
      name: value.name,
      user: {
        id: this.userCurrent.id
      }
    }
    this.albumServie.createAlbum(album).subscribe(() => {
    }, (e) => {
      console.log(e);
    });
    console.log(album);
    // await this.router.navigate(['/']);
    await this.createSuccess();
    this.albumForm.reset();
    // alert('create thành công');
  }

  createSuccess(){
    this.Toast.fire({
      icon: 'success',
      title: 'Tạo mới thành công'
    });
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
      this.userCurrent = data;
      console.log(this.userCurrent);
    }, error =>
      console.log(error));
  }
}
