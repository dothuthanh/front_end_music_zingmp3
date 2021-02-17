import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../interface/User';
import {Observable} from 'rxjs';
import {Song} from '../interface/Song';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL_REGISTER = 'http://localhost:8080/register';
  private readonly API_URL_UPDATE_PASSWORD = 'http://localhost:8080/api/auth/updateUser';

  // private readonly API_URL_GET_USER = 'http://localhost:8080/user/' ;
  private readonly API_URL_GET_USER_BY_NAME = 'http://localhost:8080/user' ;
  // private readonly API_URL_USER_INFO = 'http://localhost:8080/user' ;

  private readonly API_URL_PROFILE = 'http://localhost:8080/user';
  private readonly API__PROFILE = 'http://localhost:8080/user';

  private userUrl = 'http://localhost:8080/api/test/user';
  constructor(private httpClient: HttpClient) {
  }
ss
  getUserBoard(): Observable<string> {
    return this.httpClient.get(this.userUrl, {responseType: 'text'});
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_URL_REGISTER, user);
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<User> {
    return this.httpClient.put<User>(`${this.API_URL_UPDATE_PASSWORD}?oldPassword=${oldPassword}&newPassword=${newPassword}`, null);
  }

  // getUserById(id: number): Observable<User>{
  //   return this.httpClient.get<any>(this.API_URL_GET_USER);
  // }
  //
  // getUserInfo(id: number): Observable<User>{
  //   return this.httpClient.get<any>(this.API_URL_USER_INFO + `/${id}`);
  // }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.API__PROFILE}/${user.username}`, user);
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<any>(`${this.API_URL_PROFILE}/${id}`);
  }

  getUserByUserName(name: string): Observable<User> {
    return this.httpClient.get<User>(`${this.API_URL_GET_USER_BY_NAME}/${name}`);
  }
}
