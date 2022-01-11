import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Today } from '../../core/models/today'
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-act-time',
  templateUrl: './act-time.component.html',
  styleUrls: ['./act-time.component.scss'],
  providers: [ DatePipe ]
})
export class ActTimeComponent implements OnInit {
  @Input() name: string = 'This is XLSX TO JSON CONVERTER';

  today: Today = { "date": "", "year": "", "month": "", "week": "", "day": "" };

  /* For XLSX */
  willDownload = false;

  fileContent: string = '' ;
  file:File|null = null;
  arrayBuffer:any;
  filelist:any;
  data: any ;

  constructor(
    private datePipe: DatePipe
  ) {
    this.today.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.today.year = this.datePipe.transform(Date.now(), 'yyyy');
    this.today.month = this.datePipe.transform(Date.now(), 'M');
    this.today.week = this.datePipe.transform(Date.now(), 'ww');
   }

  ngOnInit(): void {
  }

  onFileChange2(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const ab: ArrayBuffer = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(ab);

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
//      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      this.data = XLSX.utils.sheet_to_json(ws, {header: 1});
    };
    reader.readAsArrayBuffer(target.files[0]);
  }
}
