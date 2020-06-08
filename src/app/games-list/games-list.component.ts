import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
/*
  games = [{ id: 1, title: 'The Legend of Zelda: Ocarina of Time', year: 1998 },
  { id:2, title : 'Mystical Ninja Starring Goemon', year : 1997 },
  { id:3, title : 'Doom 64', year : 1997 },
  { id:4, title : 'Super Mario 64', year : 1996 },
  { id:5, title : '007 Goldeneye', year : 1997 },
  { id:6, title : 'Resident Evil 2', year : 1999 }];
*/

  games: any;
  error;

  constructor(private httpClient: HttpClient) { 
  }

  ngOnInit(): void {
    this.onClickRefresh();
  }

  onClickRefresh() {
    const username = 'admin';
    const password = 'pass';
    // this.httpClient.get('http://www.brandontheisen.com/api/games')
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    this.httpClient.get('http://localhost:5000/api/games',{headers})
    .subscribe( response => {
      // Insert logic here for error checking;
      this.games = response;
    });
  }

  onClickDelete(game) {
    const username = 'admin';
    const password = 'pass';
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    if(window.confirm('Are you sure you want to delete: ' + game.title)) {
      // this.httpClient.delete('http://www.brandontheisen.com/api/games' + '/' 
      this.httpClient.delete('http://localhost:5000/api/games' + '/' 
        + game.id,  {headers}).subscribe(
          response => 
          {
            // console.log(response);
            this.onClickRefresh();
          }
        );
    }
  }

}
