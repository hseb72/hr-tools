import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ref-header',
  templateUrl: './ref-header.component.html',
  styleUrls: ['./ref-header.component.scss']
})

export class RefHeaderComponent implements OnInit {
  @Input() subtitle : string = '' ;
  
  public isMenuOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  andMore () {
    this . isMenuOpen = ! this . isMenuOpen ;
    //this . sidenav 
  }

}
