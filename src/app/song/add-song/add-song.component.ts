import { Component, OnInit } from '@angular/core';
import {Song} from '../../interface/Song';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SongService} from '../../service/song.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {Style} from '../../interface/Style';
import {StyleService} from '../../service/style.service';
import Swal from '../../../assets/sweetalert2/sweetalert2.min.js';
import {User} from '../../interface/User';
import {TokenStorageService} from '../../auth/token-storage.service';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {
  imageUrl: string;
  musicUrl: string;
  userCurrent: User;
  info: any;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  selectedMusic: any = null;
  selectedImage: any = null;

  songList: Song[] = [];
  styleList: Style[] = [];
  songForm: FormGroup;

  constructor(private songService: SongService,
              private styleService: StyleService,
              private fb: FormBuilder,
              private router: Router,
              private storage: AngularFireStorage,
              private tokenService: TokenStorageService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUserInfor();
    // console.log(this.info.username);
    if (this.info.username !== ''){
      this.getUserDetail();
    }
    this.songForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      lyrics: ['', [Validators.required, Validators.minLength(10)]],
      singer: ['', [Validators.required, Validators.minLength(1)]],
      author: ['', [Validators.required, Validators.minLength(1)]],
      // image: ['', [Validators.required]],
      // fileMp3: ['', [Validators.required]],
      // user: [''],
      style: this.fb.group({
        id: ['', [Validators.required]],
      }),
    });
    this.styleService.findAll().subscribe(next => (this.styleList = next), error => (this.styleList = []));
    console.log(this.styleList);
  }

  onRemove(event) {
    console.log(event);
    this.songList.splice(this.songList.indexOf(event), 1);
  }

  upload1() {
    const filePath = `databasezingmp3.appspot.com/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    return this.storage.upload(filePath, this.selectedImage).snapshotChanges().toPromise();
  }

  upload2() {
    const filePath2 = `databasezingmp3.appspot.com/${this.selectedMusic.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef2 = this.storage.ref(filePath2);
    return this.storage.upload(filePath2, this.selectedMusic).snapshotChanges().toPromise();

  }

  onchangeImage(event) {
    if (event.target.files[0] !== null) {
      this.selectedImage = event.target.files[0];
      console.log(this.selectedImage);
    }
  }

  onchangeMusic(event) {
    if (event.target.files[0] !== null) {
      this.selectedMusic = event.target.files[0];
      console.log(this.selectedMusic);
    }
  }

  async onSubmit() {
    const {value} = this.songForm;
    const upload1 = this.upload1();
    const upload2 = this.upload2();
    Promise.all([upload1, upload2]).then(async (result) => {
      console.log(result);
      const picture = await result[0].ref.getDownloadURL();
      const music = await result[1].ref.getDownloadURL();
      console.log(picture);
      console.log(music);
      const song: Song = {
        name: value.name,
        singer: value.singer,
        author: value.author,
        lyrics: value.lyrics,
        image: picture,
        fileMp3: music,
        style: value.style,
        user: {
          id: this.userCurrent.id
        }
      };
      this.songService.addSong(song).subscribe(() => {
        console.log(song);
        this.createSuccess();
        this.songForm.reset();
        }, (e) => {
        this.createFail();
        console.log(e);
      });
      await this.router.navigate(['/list']);
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

