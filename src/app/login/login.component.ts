import { GamesService } from './../games-list/services/games.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm;


  constructor(private http : HttpClient,
    private formBuilder : FormBuilder,
    private router : Router,
    private gamesService : GamesService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
    sessionStorage.setItem('token','');
  }

  submit() {
    this.gamesService.login(this.loginForm.value).subscribe(
      isValid => {
        console.log("Finished authenticating. Checking ...");
        console.log(isValid);
        // if(isValid.toString().length == 0) {
          console.log(isValid.toString().substr(25,55));
        if(isValid.toString().substr(25,55) !== 'Invalid authentication details') {
            // sessionStorage.setItem('token', isValid.);
            /*sessionStorage.setItem('token', btoa(
            this.loginForm.value.username 
            + ':' + this.loginForm.value.password));
              */
          this.router.navigate(['/']);
        } else {
          alert("Invalid Login. Please verify username and password.");
        }
      }, err => alert("Invalid Login. Please verify username and password.")
    );
  }
}
