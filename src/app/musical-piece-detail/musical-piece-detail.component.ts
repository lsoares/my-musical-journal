import { Component, OnInit } from '@angular/core';
import { MusicalPieceService } from '../musical-piece-service';
import { MusicalPiece } from '../model/musical-piece';
import { ActivatedRoute, Router } from '@angular/router';
import { Practice } from '../model/practice';

@Component({
  selector: 'app-musical-piece-detail',
  templateUrl: './musical-piece-detail.component.html',
  styleUrls: ['./musical-piece-detail.component.scss'],
})
export class MusicalPieceDetailComponent implements OnInit {
  musicalPiece: MusicalPiece;

  constructor(
    private readonly musicalPieceService: MusicalPieceService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit() {
    this.musicalPiece = this.musicalPieceService.getMusicalPiece(Number(this.route.snapshot.params.id));
  }

  onDeleteMusicalPiece() {
    if (confirm(`Delete ${this.musicalPiece.title}?`)) {
      this.musicalPieceService.deleteMusicalPiece(this.musicalPiece.id);
      this.router.navigate(['']);
    }
  }

  getLastPractice(): Practice | null {
    const practices = this.musicalPiece.practices;
    return practices.length ? practices[practices.length - 1] : null;
  }

  isStarted(): boolean {
    return this.getLastPractice() != null && this.getLastPractice().endDate == null;
  }

  onStarting() {
    this.musicalPieceService.startPractice(this.musicalPiece.id);
    this.ngOnInit();
  }

  onStopping() {
    this.musicalPieceService.stopPractice(this.musicalPiece.id);
    this.ngOnInit();
  }
}
