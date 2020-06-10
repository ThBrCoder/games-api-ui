import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private url: string = 'http://localhost:5000/api/games';
  private shortUrl: string = 'http://localhost:5000';
  // private url: string = 'http://www.brandontheisen.com/api/games';

  private username = 'admin';
  private password = 'pass';
  // private headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });

  private token;
  constructor(private httpClient: HttpClient) { }

  getGames() {
    // let headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    // let headers = new HttpHeaders({Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU5MTc5NjU4NCwiaWF0IjoxNTkxNzYwNTg0fQ.H6-Xs7vGDcFXaJgQ8UwjGzAo4c-8Z_rd2h0R-n5htXM'});
    const tokenVal = sessionStorage.getItem('token');
    let headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token })
    return this.httpClient.get(this.url, {headers})
  }

  getGameById(id: any) {
    let headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    
    return this.httpClient.get(this.url + '/' + id, {headers});
  }

  updateGame(game: any) {
    let headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });

    return this.httpClient.put(this.url, game, {headers});
  }

  addGame(game: any) {
    let headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });

    return this.httpClient.post(this.url, game, {headers});
  }

  deleteGame(id: any) {
    let headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });

    return this.httpClient.delete(this.url + '/'  + id,  {headers})
  }

  login(login: any) {
    // let headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    let headers = '';
    // return this.httpClient.post(this.shortUrl + '/login', login);
    return this.httpClient.post(this.shortUrl + '/authenticate', login);
  }

  getIsAuth() {

    const tokenVal = sessionStorage.getItem('token');
    let token = new HttpHeaders({Token: tokenVal});
    // console.log(header);
    return this.httpClient.post(this.shortUrl + '/user',{token});
  }

  logOut() {

  }
}
