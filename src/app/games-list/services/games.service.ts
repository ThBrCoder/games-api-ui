import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private url: string = 'http://localhost:5000/api/games';
  private shortUrl: string = 'http://localhost:5000';
  // private url: string = 'http://www.brandontheisen.com/api/games';

  constructor(private httpClient: HttpClient) { }

  getGames() {

    const tokenVal = sessionStorage.getItem('token');

    let headers = new HttpHeaders({ Authorization: 'Bearer ' + tokenVal })
    return this.httpClient.get(this.url, {headers})
  }

  getGameById(id: any) {

    const tokenVal = sessionStorage.getItem('token');

    let headers = new HttpHeaders({ Authorization: 'Bearer ' + tokenVal }) 
    return this.httpClient.get(this.url + '/' + id, {headers});
  }

  updateGame(game: any) {

    const tokenVal = sessionStorage.getItem('token');

    let headers = new HttpHeaders({ Authorization: 'Bearer ' + tokenVal }) 
    return this.httpClient.put(this.url, game, {headers});
  }

  addGame(game: any) {

    const tokenVal = sessionStorage.getItem('token');

    let headers = new HttpHeaders({ Authorization: 'Bearer ' + tokenVal }) 
    return this.httpClient.post(this.url, game, {headers});
  }

  deleteGame(id: any) {

    const tokenVal = sessionStorage.getItem('token');
    let headers = new HttpHeaders({ Authorization: 'Bearer ' + tokenVal }) 
    return this.httpClient.delete(this.url + '/'  + id,  {headers})
  }

  login(login: any) {

    return this.httpClient.post(this.shortUrl + '/authenticate', login);
  }

  getIsAuth() { // Update the logic to ver
    const tokenVal = sessionStorage.getItem('token');

    let headers = new HttpHeaders({ Authorization: 'Bearer ' + tokenVal }) 

    return this.httpClient.get(this.shortUrl + '/usertoken', {headers});
  }

  logOut() {

    // Clear the session storage
  }
}
