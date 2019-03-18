import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { MusicalPiece } from '../model/musical-piece';
import { PracticeTimePipe } from '../practice-time.pipe';
import { Moment } from 'moment';

@Component({
  selector: 'app-practices-chart',
  templateUrl: './practices-chart.component.html',
  styleUrls: ['./practices-chart.component.scss']
})
export class PracticesChartComponent implements OnInit, OnChanges {

  @Input() musicalPieces: MusicalPiece[];
  @Input() showLegend;
  @Input() unitOfTime;

  columnCount = 7;
  timeSlots: Moment[];
  barChartOptions: any = {
    tooltips: {
      mode: 'index',
      callbacks: {
        label(tooltipItem, data) {
          const label = data.datasets[tooltipItem.datasetIndex].label;
          const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          const total = data.datasets.reduce((acc, val) => acc + val.data[tooltipItem.index], 0);

          if (tooltipItem.datasetIndex !== data.datasets.length - 1) {
            return label + ': ' + PracticeTimePipe.convertMinsToHrsMins(value);
          } else { // .. else, you display the dataset and the total, using an array
            return [label + ': ' + PracticeTimePipe.convertMinsToHrsMins(value), 'Total: ' + PracticeTimePipe.convertMinsToHrsMins(total)];
          }
        }
      }
    },
    maintainAspectRatio: false,
    legend: {display: false},
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{stacked: true}],
      yAxes: [{stacked: true, ticks: {suggestedMin: 0, suggestedMax: 30}}]
    }
  };
  barChartLabels: string[];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: any[];

  constructor() {
  }

  ngOnInit() {
    this.barChartOptions.legend.display = this.showLegend;

    // time slots
    this.timeSlots = [];
    const lastDate = moment().startOf(this.unitOfTime);
    for (let i = 0; i < this.columnCount; i++) {
      this.timeSlots.unshift(moment(lastDate));
      lastDate.startOf(this.unitOfTime).subtract(1, this.unitOfTime);
    }

    // labels
    this.barChartLabels = this.timeSlots.map(date => date.format('Do MMM'));

    // data
    this.barChartData = [];
    this.musicalPieces.forEach((musicalPiece, i) => {
      this.barChartData[i] = {};
      this.barChartData[i].label = musicalPiece.title;

      this.barChartData[i].data = Array(this.columnCount).fill(0);
      musicalPiece.practices.forEach(practice => {
        const diff = moment.duration(moment().diff(moment(practice.startDate).startOf(this.unitOfTime))).as(this.unitOfTime);
        const slot = this.columnCount - Math.floor(diff) - 1;
        this.barChartData[i].data[slot] += PracticeTimePipe.getDuration(practice);
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }
}
