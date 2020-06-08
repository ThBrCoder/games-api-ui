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
    private router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
    sessionStorage.setItem('token','');
  }

  submit() {
    const url = 'http://localhost:5000/login'
    const result = this.http.post(url, this.loginForm.value).subscribe(
      isValid => {
        if(isValid) {
          sessionStorage.setItem('token', btoa(this.loginForm.value.username 
            + ':' + this.loginForm.value.password));
          this.router.navigate(['/']);
        } else {
          alert("Invalid Login. Please verify username and password.");
        }
      }
    );
  }
}
