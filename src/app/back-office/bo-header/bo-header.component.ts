import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bo-header',
  templateUrl: './bo-header.component.html',
  styleUrls: ['./bo-header.component.scss']
})
export class BoHeaderComponent implements OnInit {

  public isMenuOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

}
