import { Component, OnInit, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { first } from 'rxjs/operators';
import {formatDate} from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

/* Manage table function & design */
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../../core/models/invoice' ;

@Component({
  selector: 'app-inv-main',
  templateUrl: './inv-main.component.html',
  styleUrls: ['./inv-main.component.scss'],
  providers: [ MatPaginator, MatTableDataSource]

})

export class InvMainComponent implements OnInit {
  /* Variables to display data as a "material" table */
  displayedColumns: string[] = ['id', 'file', 'period', 'freelancecode',
                                'reference', 'amount',
                                'payamount', 'payed', 'paydate', 'mailtofrl', 
                                'stamped', 'estamped', 'cancelled', 'actions'];
  dataSource = new MatTableDataSource<Invoice>;

  invoices: Invoice[] = [] ;
  filteredInvoices: Invoice[] = [] ;

  /* 
    Variables to manage the pagination of data inside the table 
    using this, the users can choose the number of rows they can display on their screen
  */
  paginator: any;
  public pageSizes = [1, 5, 10, 25, 100];
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 10;

  /* 
    Variable to be able to sort data in the table 
    will contains the sorted column
  *
  sort: any;
  sortedCodes: Array<any> = [];
*/
  error = '';
  success = '' ;
  loading = false;
  
  id: string = '';
  file: string = '';
  frl: string = '';
  period: string = '';
  topay = false;
  tomatch = false;
  tocancel = true ;

  constructor(
    private invoiceService: InvoiceService) {
  }

/*
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
*/
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
//    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  ngAfterViewInit() {
    this . dataSource = new MatTableDataSource(this.filteredInvoices);
    this . setDataSourceAttributes();
  }

  refresh() {
    this.invoiceService.getAll().pipe(first()).subscribe(inv => {
      this . invoices = JSON.parse(JSON.stringify(inv));
      this . sortAndFilter () ;
    });
  }

  sortAndFilter () {
    console.log ( "cancelled: " + this.tocancel);
    this . filteredInvoices = this.invoices.sort( function(a: any, b: any) {
      const c: string = `${a.period} ${a.freelance}` ;
      const d: string = `${b.period} ${b.freelance}` ;
      return ( c <= d ? 1 : -1 );
    })
    . filter ( inv => ( ! this . period || inv . period == this . period ) )
    . filter ( inv => ( ! this . file || inv . filename == this . file ) )
    . filter ( inv => ( ! this . topay || inv . payed == '0' ) )
    . filter ( inv => ( ! this . tomatch || inv . payamount !== inv.amount ) )
    . filter ( inv => ( ! this . frl || inv . freelancecode === this . frl ) )
    . filter ( inv => ( ! this . tocancel || inv . cancelled == '0'  ) ) ;

    this . dataSource = new MatTableDataSource(this.filteredInvoices);
    this . setDataSourceAttributes();
 }
  

   resetFilters () {
    this . topay = false ;
    this . tomatch = false ;
    this . tocancel = false ;
    this . period = '' ;
    this . file = '' ;
    this . frl = '' ;
    this . sortAndFilter () ;
  }

  setToPayFilter () {
    this . topay = true ;
    this . sortAndFilter () ;
  }

  setToMatchFilter () {
    this . tomatch = true ;
    this . sortAndFilter () ;
  }

  setFileFilter (file: string) {
    this . file = file ;
    this . sortAndFilter () ;
  }

  setFrlFilter (frl: string) {
    this . frl = frl ;
    this . sortAndFilter () ;
  }

  setPeriodFilter (period: string) {
    this . period = period ;
    this . sortAndFilter () ;
  }

  setCancelledFilter () {
    this . tocancel = true ;
    this . sortAndFilter () ;
  }

  unsetToPayFilter () {
    this . topay = false ;
    this . sortAndFilter () ;
  }

  unsetToMatchFilter () {
    this . tomatch = false ;
    this . sortAndFilter () ;
  }

  unsetFileFilter () {
    this . file = '' ;
    this . sortAndFilter () ;
  }

  unsetFrlFilter () {
    this . frl = '' ;
    this . sortAndFilter () ;
  }

  unsetPeriodFilter () {
    this . period = '' ;
    this . sortAndFilter () ;
  }

  unsetCancelledFilter () {
    this . tocancel = false ;
    this . sortAndFilter () ;
  }

  clicked (id: any, field: any, oldvalue: any) {
    const now = formatDate(new Date(),'yyyy/MM/dd hh:mm:ss', 'fr') ;
    const newvalue = ( oldvalue == 0 ? 1 : 0 ) ;

    // If we are checking the payed checkbox, let set the paydate to now
    const addon = ( field == 'payed' && newvalue == 1 ? ', "paydate": "' + now + '"' : "") ; 
    const content = '{ "' + field + '": "' + newvalue + '" ' + addon + '}' ;
      this.invoiceService.patchInvoice(id, content)
      .subscribe(
        inv => {
          this.success = content ;
          this.refresh() ;
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}