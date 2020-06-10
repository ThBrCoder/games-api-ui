import { GamesService } from './../services/games.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-games-form',
  templateUrl: './games-form.component.html',
  styleUrls: ['./games-form.component.scss']
})
export class GamesFormComponent implements OnInit {

  gameForm;
  postOrPut: boolean; // True means PUT, False means POST

  constructor(private route: ActivatedRoute, 
    private gamesService: GamesService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap
      .subscribe(params => {
        if(params.get('id') !== null) {
          const id = +params.get('id');
          this.gamesService.getGameById(id)
          .subscribe( response => {
            this.gameForm = this.formBuilder.group(response);            
            console.log(response);
            this.postOrPut = true; // True means PUT
          });
        } else {
          this.gameForm = this.formBuilder.group({
            id: 0,
            title: '',
            year: null
          });
          console.log('ID not found!!');
          this.postOrPut = false; // False means POST
        }
      });
  }

  submit() {

    let gameForm = this.gameForm.value;
    gameForm.year = +gameForm.year; // Convert to integer;

    if(this.postOrPut) {
        this.gamesService.updateGame(gameForm)
        .subscribe(response => {
          console.log(response);
          // Need to add error handling if PUT fails
          this.router.navigate(['/']);
        });
    }
    else {
      // Http call for POST

      this.gamesService.addGame(gameForm)
        .subscribe(response => {
          console.log(response);
          // Need to add error handling if POST fails
          this.router.navigate(['/']);
        });
    }
  }


}
