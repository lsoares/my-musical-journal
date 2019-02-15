import { Component, OnInit } from '@angular/core';
import { MusicalPieceService } from '../musical-piece-service';
import { MusicalPiece } from '../model/musical-piece';
import { ActivatedRoute } from '@angular/router';
import { Practice } from '../model/practice';

@Component({
  selector: 'app-musical-piece-detail',
  templateUrl: './musical-piece-detail.component.html',
  styleUrls: ['./musical-piece-detail.component.scss'],
})
export class MusicalPieceDetailComponent implements OnInit {
  musicalPiece: MusicalPiece;
  stopped: boolean;

  constructor(
    private readonly musicalPieceService: MusicalPieceService,
    private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.musicalPiece = this.musicalPieceService.getMusicalPiece(Number(this.route.snapshot.params.id));
  }

  getPractices(): Practice[] {
    return this.musicalPieceService.loadPractices(this.musicalPiece.id);
  }

  getLastPractice(): Practice | null {
    const practices = this.getPractices();
    return practices.length ? practices[practices.length - 1] : null;
  }

  isStarted(): boolean {
    return this.getLastPractice() != null && this.getLastPractice().endDate == null;
  }

  onStop() {
    const practices = this.getPractices();
    if (!practices.length) {
      throw (new Error(`No practice started for musical piece ${this.musicalPiece.title}`));
    }
    const lastPractice = practices.pop();
    practices.push(new Practice(lastPractice.startDate, new Date()));
    this.musicalPieceService.storePractices(this.musicalPiece.id, practices);
  }

  onStart() {
    const practices = this.getPractices();
    // TODO: stop other practice running!
    // TODO: set interval to auto update
    practices.push(new Practice());
    this.musicalPieceService.storePractices(this.musicalPiece.id, practices);
  }
}
