import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Song} from '../interface/Song';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  song: Song[] = [];
  value = new BehaviorSubject('');
  list = new BehaviorSubject(this.song);
  constructor() { }
  changeValue(message: string, song: Song[]) {
    this.value.next(message);
    this.list.next(song);
  }
}
