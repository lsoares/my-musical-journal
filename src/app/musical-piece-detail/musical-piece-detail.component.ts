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
  type = 'day';

  constructor(
    private readonly musicalPieceService: MusicalPieceService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {
  }

  ngOnInit() {
    const fetch = () => this.musicalPiece = this.musicalPieceService.getMusicalPiece(Number(this.route.snapshot.params.id));
    fetch();

    setInterval(fetch, 1000 * 59);
  }

  onDeleteMusicalPiece() {
    if (confirm(`Delete ${this.musicalPiece.title}?`)) {
      this.musicalPieceService.deleteMusicalPiece(this.musicalPiece.id);
      this.router.navigate(['']);
    }
  }

  getLastPractice(): Practice | null {
    return this.musicalPiece.practices.find(practice => practice.endDate == null);
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
