import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-act-header',
  templateUrl: './act-header.component.html',
  styleUrls: ['./act-header.component.scss']
})
export class ActHeaderComponent implements OnInit {

  public isMenuOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  andMore () {
    this . isMenuOpen = ! this . isMenuOpen ;
    //this . sidenav 
  }
}
