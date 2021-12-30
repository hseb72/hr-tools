import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-per-header',
  templateUrl: './per-header.component.html',
  styleUrls: ['./per-header.component.scss']
})
export class PerHeaderComponent implements OnInit {

  public isMenuOpen = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
