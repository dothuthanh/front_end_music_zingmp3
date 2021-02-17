import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddAlbumComponent} from './add-album/add-album.component';
import {LayoutComponent} from './layout/layout.component';
import {AddAblumSongComponent} from './add-ablum-song/add-ablum-song.component';
import {FooterComponent} from './footer/footer.component';
import {WelcomeAreaComponent} from './welcome-area/welcome-area.component';
import {NavbarComponent} from './navbar/navbar.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from 'ckeditor4-angular';
import {UserGuard} from '../user.guard';

import { AllAlbumComponent } from './all-album/all-album.component';
import { AlbumListSongComponent } from './album-list-song/album-list-song.component';
import {SongModule} from "../song/song.module";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'create',
        canActivate: [UserGuard],
        component: AddAlbumComponent
      },
      {
        path: 'create-song',
        canActivate: [UserGuard],
        component: AddAblumSongComponent
      },
      {
        path: 'list/:id',
        canActivate: [UserGuard],
        component: AlbumListSongComponent
      },
      {
        path: 'list-album',
        canActivate: [UserGuard],
        component: AllAlbumComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    FooterComponent,
    LayoutComponent,
    WelcomeAreaComponent,
    NavbarComponent,
    AddAblumSongComponent,
    AddAlbumComponent,
    AllAlbumComponent,
    AlbumListSongComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    SongModule
  ]
})
export class AlbumModule { }
