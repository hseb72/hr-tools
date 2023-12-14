import { Component } from '@angular/core';

import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-inv-report',
  templateUrl: './inv-report.component.html',
  styleUrl: './inv-report.component.scss'
})
export class InvReportComponent {

  error = '';
  success = '' ;
  loading = false ;

  constructor(
    private invoiceService: InvoiceService
  ) {}

  sendReport () {
    const period = (document.getElementById( 'period' ) as HTMLInputElement).value;
    const recipients = (document.getElementById( 'recipients' ) as HTMLInputElement).value;
    const content = '{ "period": "' + period + '", "recipients": "' + recipients + '" }' ;

    this.invoiceService.sendreport(content)
    .subscribe(
      resp => {
        console.log ( 'I did it !') ;
        this.success = content ;
      },
      error => {
        console.log ( 'I failed it !') ;
        this.error = error;
        this.loading = false;
      }
    );
  }
}
