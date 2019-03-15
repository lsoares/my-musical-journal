import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MusicalPiece } from '../model/musical-piece';
import { Practice } from '../model/practice';

@Component({
  selector: 'app-practices-chart',
  templateUrl: './practices-chart.component.html',
  styleUrls: ['./practices-chart.component.scss']
})
export class PracticesChartComponent implements OnInit {

  @Input() musicalPieces: MusicalPiece[];
  @Input() days;
  @Input() showLegend;

  barChartOptions: any = {
    legend: { display: false },
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{ stacked: true }],
      yAxes: [{ stacked: true, ticks: { suggestedMin: 0, suggestedMax: 30 } }]
    }
  };
  barChartLabels: string[] = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: any[] = [];

  constructor() { }

  ngOnInit() {
    this.barChartOptions.legend.display = this.showLegend;
    // labels
    for (let i = this.days; i > 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i + 1);
      this.barChartLabels.push(moment(this.atMidNight(date)).format('Do MMM'));
    }
    // data
    this.musicalPieces.forEach((musicalPiece, i) => {
      this.barChartData[i] = {};
      this.barChartData[i].label = musicalPiece.title;

      this.barChartData[i].data = Array(this.days).fill(0);
      musicalPiece.practices.forEach(practice => {
        const dayOffset = Math.round((
          this.atMidNight(new Date()).getTime() - this.atMidNight(practice.startDate).getTime()) / (1000 * 60 * 60 * 24)
        );
        this.barChartData[i].data[this.days - dayOffset - 1] += this.getDuration(practice);
      });
    });
  }

  getDuration(practice: Practice) {
    return Math.round(((practice.endDate || new Date()).getTime() - practice.startDate.getTime()) / (60 * 1000));
  }

  atMidNight(date: Date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  chartClicked(e: any) {}

  chartHovered(e: any) {}
}
