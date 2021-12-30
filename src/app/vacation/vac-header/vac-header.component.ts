import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vac-header',
  templateUrl: './vac-header.component.html',
  styleUrls: ['./vac-header.component.scss']
})
export class VacHeaderComponent implements OnInit {

  public isMenuOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

}
