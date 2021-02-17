import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Song} from '../interface/Song';
import {Observable} from 'rxjs';
import {Like} from '../interface/like';

// const API_SONG = 'http://localhost:8080/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private readonly API_URL_CREATE_SONG = 'http://localhost:8080/song/create';
  private readonly API_SONG = 'http://localhost:8080/song';
  private readonly API_SONG_FIND = 'http://localhost:8080/findByName';
  private readonly API_LATEST_SONG = 'http://localhost:8080/latest-song';
  private readonly API_ALL_SONG_BY_USER_ID = 'http://localhost:8080/song/mylist';
  private readonly API_MOST_VIEWS_SONG = 'http://localhost:8080/most-views-song';
  private readonly API_MOST_LIKES_SONG = 'http://localhost:8080/most-like-song';
  private readonly API_LIKE_SONG = 'http://localhost:8080/like';
  constructor(private httpClient: HttpClient) {
  }

  addSong(song: Song): Observable<Song> {
    return this.httpClient.post<Song>(this.API_URL_CREATE_SONG, song);
  }

  updateSong(song: Song): Observable<Song> {
    return this.httpClient.put<Song>(`${this.API_SONG}/${song.id}`, song);
  }

  getSongById(id: number): Observable<Song> {
    return this.httpClient.get<any>(`${this.API_SONG}/${id}`);
  }

  getAllSongByUserId(id: number): Observable<Song[]> {
    return this.httpClient.get<Song[]>(`${this.API_ALL_SONG_BY_USER_ID}/${id}`);
  }
  getSongByName(name: string): Observable<Song[]> {
    return this.httpClient.get<Song[]>(`${this.API_SONG_FIND}/${name}`);
  }
  deleteSong(id: number): Observable<Song> {
    return this.httpClient.delete<Song>(this.API_SONG + `/${id}`);
  }
  getAllSongsLatest(): Observable<Song[]> {
    return this.httpClient.get<Song[]>(this.API_LATEST_SONG);
  }
  // detailSong(id: string): Observable<Song> {
  //   return this.httpClient.get<Song>(this.API_SONG + `/${id}`);
  // }
  getAllSongs(): Observable<Song[]> {
    return this.httpClient.get<Song[]>(this.API_SONG);
  }
  getMostViewSong(): Observable<Song[]>{
    return this.httpClient.get<Song[]>(this.API_MOST_VIEWS_SONG);
  }

  likeSong(like: Like, id: number): Observable<Like>{
    return this.httpClient.put<Like>(`${this.API_LIKE_SONG}/${id}`, like);
  }

  getSongHaveMostLike(): Observable<Song[]>{
    return this.httpClient.get<Song[]>(this.API_MOST_LIKES_SONG);
  }
}
