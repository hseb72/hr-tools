import { Component, OnInit } from '@angular/core';
import { EmptyError } from 'rxjs';
import { EmployeeService } from "../../core/services/employee.service"
@Component({
  selector: 'app-per-main',
  templateUrl: './per-main.component.html',
  styleUrls: ['./per-main.component.scss']
})
export class PerMainComponent implements OnInit {

  currentUser: any = 0;
  employee: any;

  constructor(private employeeService: EmployeeService) { 
    var user = localStorage.getItem('user') ;
    if (user) this . currentUser = JSON.parse(user) . id ;

    this . employeeService . getEmployee ( this . currentUser )
    . subscribe ( 
      emp => { 
        this . employee = emp ; 
        console.log ( JSON . stringify ( emp ) ) 
      }
    );
  }

  ngOnInit(): void {
  }

}
