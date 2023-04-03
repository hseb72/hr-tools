import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inv-header',
  templateUrl: './inv-header.component.html',
  styleUrls: ['./inv-header.component.scss']
})
export class InvHeaderComponent implements OnInit {

  public isMenuOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  andMore () {
    this . isMenuOpen = ! this . isMenuOpen ;
    //this . sidenav 
  }

}
