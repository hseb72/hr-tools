import { Component, OnInit, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { first } from 'rxjs/operators';

declare var $: any;

interface invoice {
  freelance: any;
  id: string,
  period: string;
  frl: string;
  filename: string;
  payed: string;
  payamount: string;
  amount: string;
  reference: string;
  frldisplay: string;
  sordisplay: string;
  freelancecode: string;
  stamped: string;
  estamped: string;
  mailtofrl: string;
  cancelled: string;
}

@Component({
  selector: 'app-inv-main',
  templateUrl: './inv-main.component.html',
  styleUrls: ['./inv-main.component.scss']
})
export class InvMainComponent implements OnInit {

  invoices: invoice[] = [] ;
  filteredInvoices: invoice[] = [] ;
  
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
  
  constructor(private invoiceService: InvoiceService) {
    
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    //    console.log('in refresh');
    //    this . rap = false ;
    this.invoiceService.getAll().pipe(first()).subscribe(inv => {
      this.invoices = JSON.parse(JSON.stringify(inv));
      this . sortAndFilter () ;
    });
  }

  sortAndFilter () {
    console.log ( "cancelled" + this.tocancel);
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
    const newvalue = ( oldvalue == 0 ? 1 : 0 ) ;
    const content = '{ "' + field + '": "' + newvalue + '" }' ;
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
