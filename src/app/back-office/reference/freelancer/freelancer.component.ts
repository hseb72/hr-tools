import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs/operators';

/* Manage table function & design */
import {ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { FreelancerService } from '../../services/freelancer.service';
import { Freelancer } from '../../../core/models/freelancer';

@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrl: './freelancer.component.scss'
})
export class FreelancerComponent {
  /* Variables to display data as a "material" table */
  displayedColumns: string[] = ['id', 'compname', 'headname', 'code',
                                'mainemail', 'activefrom', 'activeuntil',
                                'actions'];
  dataSource = new MatTableDataSource<Freelancer>;

  freelancers:Freelancer[] = [] ;

  /* 
    Variables to manage the pagination of data inside the table 
    using this, the users can choose the number of rows they can display on their screen
  */
    paginator: any;
    public pageSizes = [1, 5, 10, 25, 100];
    public pageSize = 10;
    public currentPage = 0;
    public totalSize = 10;
    
    constructor(
    private freelancerService: FreelancerService
  ) {}

  ngOnInit() {
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  ngAfterViewInit() {
    this . dataSource = new MatTableDataSource(this.freelancers);
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
//    this.dataSource.sort = this.sort;
  }

  refresh() {
    console.log('in refresh');
    this.freelancerService.getAll().pipe(first()).subscribe(frl => {
      this.freelancers = JSON.parse(JSON.stringify(frl));
      this . dataSource = new MatTableDataSource(this.freelancers);
      this . setDataSourceAttributes();
      });
  }

}
