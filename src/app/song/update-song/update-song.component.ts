import { Component, OnInit } from '@angular/core';
import {Song} from '../../interface/Song';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SongService} from '../../service/song.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {Style} from '../../interface/Style';
import {StyleService} from '../../service/style.service';
import Swal from '../../../assets/sweetalert2/sweetalert2.min.js';

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styleUrls: ['./update-song.component.css']
})
export class UpdateSongComponent implements OnInit {

  imageUrl: string;
  musicUrl: string;

  selectedMusic: any = null;
  selectedImage: any = null;

  styleList: Style[] = [];
  song: Song;
  success: string;
  fail: string;
  songForm: FormGroup;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  constructor(private songService: SongService,
              private storage: AngularFireStorage,
              private route: ActivatedRoute,
              private routes: Router,
              private styleService: StyleService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.songForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      lyrics: ['', [Validators.required, Validators.minLength(10)]],
      singer: ['', [Validators.required, Validators.minLength(5)]],
      author: ['', [Validators.required, Validators.minLength(5)]],
      // image: ['', [Validators.required]],
      style: this.fb.group({
        id: ['', [Validators.required]],
      }),
    });
    this.styleService.findAll().subscribe( next => (this.styleList = next), error => (this.styleList = []));
    console.log(this.styleList);
    const id = +this.route.snapshot.paramMap.get('id');
    this.songService.getSongById(id)
      .subscribe(result => {
        this.song = result;
        this.songForm.patchValue(this.song);
        this.success = 'Edit song successfully !';
      }, error => {
        this.fail = 'Edit song fail';
      });
  }
  updateSong(){
    if (this.songForm.valid) {
      const {value} = this.songForm;
      const data = {
        ...this.song,
        ...value
      };
      this.songService.updateSong(data)
        .subscribe(result => {
          this.routes.navigate(['song/list']);
          this.updateSuccess();
        }, error => {
          console.log(error);
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
