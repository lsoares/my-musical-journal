import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MusicalPiece } from '../model/musical-piece';
import { MusicalPieceService } from '../musical-piece-service';
import * as moment from 'moment';

@Component({
  selector: 'app-practices-list',
  templateUrl: './practices-list.component.html',
  styleUrls: ['./practices-list.component.scss']
})
export class PracticesListComponent implements OnInit {

  @Input() musicalPiece: MusicalPiece;
  @Output() changedList = new EventEmitter<boolean>();

  creatingPractice = true;
  practiceModel: any = {};

  constructor(private readonly musicalPieceService: MusicalPieceService) { }

  ngOnInit() {
  }

  onDeletingPractice(id: number) {
    if (confirm(`Delete practice session?`)) {
      this.musicalPieceService.deletePractice(this.musicalPiece.id, id);
      this.changedList.emit(true);
    }
  }

  onSubmitCreatePractice() {
    const startDate = new Date(this.practiceModel.date);
    const endDate = moment(startDate).add(this.practiceModel.duration, 'm').toDate();

    this.musicalPieceService.createPractice(this.musicalPiece.id, startDate, endDate);
    this.practiceModel = {};
    this.changedList.emit(true);
  }

  formatDate(date: Date) {
    return moment(date).format('D MMM YY');
  }
}
