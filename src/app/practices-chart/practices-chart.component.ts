import { Component, OnInit, Input } from '@angular/core';
import { Practice } from '../model/practice';
import * as moment from 'moment';
import { MusicalPiece } from '../model/musical-piece';

@Component({
  selector: 'app-practices-chart',
  templateUrl: './practices-chart.component.html',
  styleUrls: ['./practices-chart.component.scss']
})
export class PracticesChartComponent implements OnInit {

  @Input() musicalPiece: MusicalPiece;
  @Input() practices: Practice[];

  barChartOptions: any = { scaleShowVerticalLines: false, responsive: false };
  barChartLabels: string[] = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: any[] = [ { data: [], label: '' } ];

  constructor() { }

  ngOnInit() {
    this.barChartData[0].label = this.musicalPiece.title;
    const size = 15;
    // labels
    for (let i = size; i > 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i + 1);
      d.setHours(0, 0, 0, 0);
      this.barChartLabels.push(moment(d).format('Do MMM'));
    }
    // data
    this.barChartData[0].data = Array(size).fill(0);
    this.practices.forEach(practice => {
      const minutes = Math.round(((practice.endDate || new Date()).getTime() - practice.startDate.getTime()) / (60 * 1000));
      const dayOffset = Math.round((new Date().getTime() - practice.startDate.getTime()) / (1000 * 60 * 60 * 24));
      this.barChartData[0].data[size - dayOffset - 1] += minutes;
    });
  }

  chartClicked(e: any): void {
  }

  chartHovered(e: any): void {
  }
}
