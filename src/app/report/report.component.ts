import { Component, OnInit } from '@angular/core';
import { MusicalPiece } from '../model/musical-piece';
import { MusicalPieceService } from '../musical-piece-service';
import { Practice } from '../model/practice';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  musicalPieces: MusicalPiece[];
  days = 10;
  minutesPerDay = 0;
  totalMinutes = 0;

  constructor(private readonly musicalPieceService: MusicalPieceService) { }

  ngOnInit() {
    this.musicalPieces = this.musicalPieceService.getMusicalPieces();

    const filterPracticesFromLastXDays = (practice: Practice) => {
        const daysOffset = (new Date().getTime() - practice.startDate.getTime()) / (1000 * 60 * 60 * 24);
        return daysOffset >= 0 && daysOffset < this.days;
      };

    const sumPracticesTime = (acc: number, practice: Practice) =>
        acc + ((practice.endDate || new Date()).getTime() - practice.startDate.getTime()) / (1000 * 60);

    const sumTotalTime = (totalAcc: number, musicalPiece: MusicalPiece) =>
        totalAcc + musicalPiece.practices.filter(filterPracticesFromLastXDays).reduce(sumPracticesTime, 0);

    this.totalMinutes = Math.round(this.musicalPieces.reduce(sumTotalTime, 0));
    this.minutesPerDay = this.totalMinutes / this.days;
  }
}
