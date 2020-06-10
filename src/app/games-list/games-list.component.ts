import { GamesService } from './services/games.service';
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

  constructor(private gamesService : GamesService) { 
  }

  ngOnInit(): void {
    this.onClickRefresh();
  }

  onClickRefresh() {

    this.gamesService.getGames()
    .subscribe( response => {
      // Insert logic here for error checking;
      this.games = response;
    });

    this.gamesService.getIsAuth().subscribe(value => console.log(value));

  }

  onClickDelete(game) {

    if(window.confirm('Are you sure you want to delete: ' + game.title)) {
       this.gamesService.deleteGame(game.id)
        .subscribe(response => 
          {
            // console.log(response);
            this.onClickRefresh();
          }
        );
    }
  }

}
