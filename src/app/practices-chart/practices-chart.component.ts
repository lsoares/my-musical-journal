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

  @Input() musicalPieces: MusicalPiece[];

  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: false,
    scales: {
      xAxes: [{ stacked: true }],
      yAxes: [{ stacked: true }]
    }
  };
  barChartLabels: string[] = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: any[] = [];

  constructor() { }

  ngOnInit() {
    const size = 15;
    // labels
    for (let j = size; j > 0; j--) {
      const d = new Date();
      d.setDate(d.getDate() - j + 1);
      d.setHours(0, 0, 0, 0);
      this.barChartLabels.push(moment(d).format('Do MMM'));
    }
    // data
    this.musicalPieces.forEach((musicalPiece, i) => {
      this.barChartData[i] = {};
      this.barChartData[i].label = musicalPiece.title;

      this.barChartData[i].data = Array(size).fill(0);
      musicalPiece.practices.forEach(practice => {
        const minutes = Math.round(((practice.endDate || new Date()).getTime() - practice.startDate.getTime()) / (60 * 1000));
        const dayOffset = Math.round((new Date().getTime() - practice.startDate.getTime()) / (1000 * 60 * 60 * 24));
        this.barChartData[i].data[size - dayOffset - 1] += minutes;
      });
    });
  }

  chartClicked(e: any) {}

  chartHovered(e: any) {}
}
