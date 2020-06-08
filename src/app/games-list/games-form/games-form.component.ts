import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    const username = 'admin';
    const password = 'pass';
    // this.httpClient.get('http://www.brandontheisen.com/api/games')
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    this.route.paramMap
      .subscribe(params => {
        if(params.get('id') !== null) {
          const id = +params.get('id');
          // this.httpClient.get('http://www.brandontheisen.com/api/games' + '/' + id)
          this.httpClient.get('http://localhost:5000/api/games' + '/' + id,{headers})
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
    const username = 'admin';
    const password = 'pass';
    // this.httpClient.get('http://www.brandontheisen.com/api/games')
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    if(this.postOrPut) {
      let put = this.gameForm.value;
      put.year = +put.year;
      
      // this.httpClient.put('http://www.brandontheisen.com/api/games', 
      this.httpClient.put('http://localhost:5000/api/games', 
        put).subscribe(response => {
          console.log(response);
          // Need to add error handling if PUT fails
          this.router.navigate(['/']);
        });
    }
    else {
      // Http call for POST
      let post = this.gameForm.value;
      post.year = +post.year;
      // this.httpClient.post('http://www.brandontheisen.com/api/games', 
      this.httpClient.put('http://localhost:5000/api/games',
        post,{headers: headers}).subscribe(response => {
          console.log(response);
          // Need to add error handling if POST fails
          this.router.navigate(['/']);
        });
    }
  }


}
