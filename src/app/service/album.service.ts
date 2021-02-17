import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Album} from "../interface/Album";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private readonly API_URL_CREATE_ALBUM = 'http://localhost:8080/album/create';
  private readonly API_URL_ALBUM= 'http://localhost:8080/album';
  private readonly API_URL_ALBUM_BY_ID= 'http://localhost:8080/album';
  private readonly API_URL_DELETE_ALBUM_BY_ID= 'http://localhost:8080/album';
  private readonly API_URL_ALBUMS_BY_USER_ID= 'http://localhost:8080/album/user';
  constructor(private httpClient: HttpClient) { }

  createAlbum(album :Album): Observable<Album>{
    return this.httpClient.post<Album>(this.API_URL_CREATE_ALBUM, album);
  }

  getAllAlbum(): Observable<Album[]>{
    return this.httpClient.get<Album[]>(this.API_URL_ALBUM);
  }

  getAllAlbumByUserId(id: number): Observable<Album[]>{
    return this.httpClient.get<Album[]>(`${this.API_URL_ALBUMS_BY_USER_ID}/${id}`);
  }

  getSongByAlbumId(id: number): Observable<any>{
    return this.httpClient.get<any>(`${this.API_URL_ALBUM_BY_ID}/${id}`)
  }

  deleteAlbum(id: number): Observable<Album>{
    return this.httpClient.delete<Album>(this.API_URL_DELETE_ALBUM_BY_ID + `/${id}`)
  }
}
