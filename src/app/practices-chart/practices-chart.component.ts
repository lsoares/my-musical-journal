import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MusicalPiece } from '../model/musical-piece';
import { PracticeTimePipe } from '../practice-time.pipe';

@Component({
  selector: 'app-practices-chart',
  templateUrl: './practices-chart.component.html',
  styleUrls: ['./practices-chart.component.scss']
})
export class PracticesChartComponent implements OnInit {

  @Input() musicalPieces: MusicalPiece[];
  @Input() showLegend;

  type = 'day';
  columnCount = 7;
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

  constructor() {
  }

  ngOnInit() {
    this.barChartOptions.legend.display = this.showLegend;

    let multiplier = 1;
    if (this.type === 'week') {
      multiplier = 7;
    } else if (this.type === 'month') {
      multiplier = 30;
    }
    // labels
    this.barChartLabels = [];
    for (let i = this.columnCount; i > 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i * multiplier + 1);
      this.barChartLabels.push(moment(this.atMidNight(date)).format('Do MMM'));
    }
    // data
    this.barChartData = [];
    this.musicalPieces.forEach((musicalPiece, i) => {
      this.barChartData[i] = {};
      this.barChartData[i].label = musicalPiece.title;

      this.barChartData[i].data = Array(this.columnCount).fill(0);
      musicalPiece.practices.forEach(practice => {
        const offset = Math.round((
          this.atMidNight(new Date()).getTime() - this.atMidNight(practice.startDate).getTime()) / (1000 * 60 * 60 * 24)
        ) * multiplier;
        this.barChartData[i].data[this.columnCount - offset - 1] += PracticeTimePipe.getDuration(practice);
      });
    });
  }

  private atMidNight(date: Date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }
}
