import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Style} from '../interface/Style';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private readonly API_URL_STYLE_LIST = 'http://localhost:8080/style';
  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Style[]> {
    return  this.httpClient.get<Style[]>(this.API_URL_STYLE_LIST);
  }
}
