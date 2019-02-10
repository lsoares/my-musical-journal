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

  getLastPractice(): Practice | null {
    const practices = this.getPractices(this.musicalPiece.id);
    return practices.length ? practices[practices.length - 1] : null;
  }

  isStarted(): boolean {
    return this.getLastPractice() != null && this.getLastPractice().endDate == null;
  }

  onStop() {
    const practices = this.getPractices(this.musicalPiece.id);
    if (!practices.length) {
      throw (new Error(`No practice started for musical piece ${this.musicalPiece.id}`));
    }
    const lastPractice = practices.pop();
    practices.push(new Practice(lastPractice.startDate, new Date()));
    this.storePractices(this.musicalPiece.id, practices);
  }

  onStart() {
    // TODO: stop other practice running!
    // TODO: set interval to auto update
    const practices = this.getPractices(this.musicalPiece.id);
    practices.push(new Practice());
    this.storePractices(this.musicalPiece.id, practices);
  }

  private getPractices(id: number): Practice[] {
    return JSON.parse(localStorage.getItem(id.toString()) || '[]')
      .map((practice: Practice) =>
         new Practice(
          practice.startDate && new Date(practice.startDate),
          practice.endDate && new Date(practice.endDate)
        )
      );
  }

  private storePractices(id: number, practices: Practice[]) {
    localStorage.setItem(id.toString(), JSON.stringify(practices));
  }
}
