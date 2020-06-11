import { AuthGuardService } from './shared/security/auth-guard.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GamesFormComponent } from './games-list/games-form/games-form.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    GamesFormComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: '', component: HomeComponent, canActivate: [AuthGuardService], 
      children: [
        { path: 'games-form', component: GamesFormComponent, canActivate: [AuthGuardService] },
        { path: 'games-form/:id', component: GamesFormComponent, canActivate: [AuthGuardService] },
      ]},

      /* { path: '**', component: GamesFormComponent}, */ // Page Not Found Component - Need to be implemented
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
