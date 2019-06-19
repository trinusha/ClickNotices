import { Component, OnInit } from '@angular/core';
import { FilingAnalysisService } from './services/filing-analysis.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dropdownContent;
  filingResponseData: any[];
  selectedDate = '0';
  courtesyLetterSum = 0;
  courtesyAmountSum = 0;
  rentSuitsSum = 0;
  rentSuitsAmountSum = 0;
  evictionsSum = 0;
  evictionsAmountSum = 0;
  currentMonth = '';
  lastMonth = '';

  constructor(
    public filingService: FilingAnalysisService,
    public datePipe: DatePipe
  ) {}

  calculateFilingData() {
    this.courtesyLetterSum = 0;
    this.courtesyAmountSum = 0;
    this.rentSuitsSum = 0;
    this.rentSuitsAmountSum = 0;
    this.evictionsSum = 0;
    this.evictionsAmountSum = 0;
    console.log(this.selectedDate);
    this.filingResponseData.forEach(filingItem => {
      switch (this.selectedDate) {
        case '0':
          this.a(filingItem);
          break;
        case '1':
          this.a(filingItem, this.currentMonth);
          break;
        case '2':
          this.a(filingItem, this.lastMonth);
          break;
      }
    });
  }

  a(filingItem, calcMonth = '') {
    const monthFromData = this.datePipe.transform(filingItem.date, 'MMMM');
    if (calcMonth !== '' && monthFromData !== calcMonth) {
      return;
    }
    this.courtesyLetterSum += filingItem.courtesyLetterCount;
    this.courtesyAmountSum += filingItem.courtesyLetterBalance;
    this.rentSuitsSum += filingItem.rentSuitsCount;
    this.rentSuitsAmountSum += filingItem.rentSuitsBalance;
    this.evictionsSum += filingItem.evictionsCount;
    this.evictionsAmountSum += filingItem.evictionsBalance;
  }

  ngOnInit() {
    const convertDate = new Date();
    this.currentMonth = this.toNamedMonth(convertDate);
    this.lastMonth = this.toNamedMonth(
      convertDate.setMonth(convertDate.getMonth() - 1)
    );
    this.filingService.getFilingsData().subscribe(
      response => {
        if (response != null) {
          console.table(response);
          this.filingResponseData = response;
          this.calculateFilingData();
        }
      },
      error => {
        console.error('hi error happened', error);
      }
    );
    // const thisMonth = new Date().getMonth();
    // this.currentMonth = this.toNamedMonth(thisMonth + 1);
    // Ternary Operator
    // this.lastMonth =
    //   thisMonth === 0
    //     ? this.toNamedMonth(12)
    //     : this.toNamedMonth(thisMonth) + '';

    // this.dropdownContent = [
    //   'All',
    //   'Current Month (' + this.currentMonth + ')',
    //   'Last Month(' + this.lastMonth + ')',
    //   'Last 3 Months',
    //   'Last 6 Months',
    //   'Last 12 Months'
    // ];
    this.dropdownContent = [
      { value: 0, text: 'All' },
      { value: 1, text: 'Current Month (' + this.currentMonth + ')' },
      { value: 2, text: 'Last Month(' + this.lastMonth + ')' }
      // { value: 3, text: 'Last 3 Months' },
      // { value: 4, text: 'Last 6 Months' },
      // { value: 5, text: 'Last 12 Months' }
    ];
  }

  toNamedMonth(convertDate: any) {
    return this.datePipe.transform(convertDate, 'MMMM');
  }
}
