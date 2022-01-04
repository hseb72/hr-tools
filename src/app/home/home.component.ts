import { Component, OnInit } from '@angular/core';

import { User } from '../core/models/user';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
/* Test d'interface */
  title = "This is a Test" ;
  isAuthenticated = false ;
/* Fin test Interface */

  user: User;

  constructor(private authenticationService: AuthenticationService) {
    this.user = this.authenticationService.userValue;
  }
  ngOnInit(): void {
  }

/* Test d'interface */
  async logout(): Promise<void> {
    this . isAuthenticated = false ;
  }
/* Fin test Interface */
}