import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Image} from '../interface/Image';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private http: HttpClient) { }
  getAllImage(): Observable<Image[]> {
    return this.http.get<Image[]>(API_URL + '/images');
  }

  createImage(image: Image): Observable<Image> {
    return this.http.post<Image>(API_URL + '/images', image);
  }

  updateImage(id: number, image: Image): Observable<Image> {
    return this.http.put<Image>(API_URL + `/images/${id}`, image);
  }

  deleteImage(id: number): Observable<Image> {
    return this.http.delete<Image>(API_URL + `/images/${id}`);
  }

  getImage(id: number): Observable<Image> {
    return this.http.get<Image>(API_URL + `/images/${id}`);
  }
}
