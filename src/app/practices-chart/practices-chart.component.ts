import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { MusicalPiece } from '../model/musical-piece';

@Component({
  selector: 'app-practices-chart',
  templateUrl: './practices-chart.component.html',
  styleUrls: ['./practices-chart.component.scss']
})
export class PracticesChartComponent implements OnInit {

  @Input() musicalPieces: MusicalPiece[];
  // TODO update chart when practices change https://angular.io/api/core/ChangeDetectorRef
  @Input() days;

  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: false,
    scales: {
      xAxes: [{ stacked: true }],
      yAxes: [{ stacked: true, ticks: { suggestedMin: 0 } }]
    }
  };
  barChartLabels: string[] = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: any[] = [];

  constructor() { }

  ngOnInit() {
    // labels
    for (let i = this.days; i > 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i + 1);
      d.setHours(0, 0, 0, 0);
      this.barChartLabels.push(moment(d).format('Do MMM'));
    }
    // data
    this.musicalPieces.forEach((musicalPiece, i) => {
      this.barChartData[i] = {};
      this.barChartData[i].label = musicalPiece.title;

      this.barChartData[i].data = Array(this.days).fill(0);
      musicalPiece.practices.forEach(practice => {
        const minutes = Math.round(((practice.endDate || new Date()).getTime() - practice.startDate.getTime()) / (60 * 1000));
        const dayOffset = Math.round((new Date().getTime() - practice.startDate.getTime()) / (1000 * 60 * 60 * 24));
        this.barChartData[i].data[this.days - dayOffset - 1] += minutes;
      });
    });
  }

  chartClicked(e: any) {}

  chartHovered(e: any) {}
}
