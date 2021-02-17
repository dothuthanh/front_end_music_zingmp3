import { Injectable } from '@angular/core';
import {Like} from "../interface/like";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  // like: Like[] = [];
  private readonly API_URL_LIKE = 'http://localhost:8080/likes';
  constructor(private httpClient: HttpClient) { }

  likes(like: Like): Observable<Like>{
    return this.httpClient.post<Like>(this.API_URL_LIKE, like);
  }
  // tslint:disable-next-line:component-selector

  // getLikes(): Observable<Like[]>{
  //   return this.httpClient.get<Like[]>(this.API_URL_LIKE);
  // }


}
