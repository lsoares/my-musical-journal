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

  onStarting() {
    this.musicalPieceService.startPractice(this.musicalPiece.id);
    // TODO: set interval to auto update
  }

  onStopping() {
    this.musicalPieceService.stopPractice(this.musicalPiece.id);
  }

  onDeletingPractice(id: number) {
    this.musicalPieceService.deletePractice(this.musicalPiece.id, id);
  }
}
