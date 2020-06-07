import { HttpClient } from '@angular/common/http';
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
    this.httpClient.get('http://www.brandontheisen.com/api/games')
    .subscribe( response => {
      // Insert logic here for error checking;
      this.games = response;
    });
  }

  onClickAdd() {
    // this.games.push({id : 7, title : 'Mischief Makers', year : 1997 });

  }

  onClickDelete(game) {
    if(window.confirm('Are you sure you want to delete: ' + game.title)) {
      this.httpClient.delete('http://www.brandontheisen.com/api/games' + '/' 
        + game.id).subscribe(
          response => 
          {
            // console.log(response);
            this.onClickRefresh();
          }
        );
    }
  }

  onClickUpdate() {

  }

}
