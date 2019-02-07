import { Component, OnInit } from '@angular/core';
import { MusicalPieceService } from '../musical-piece-service';
import { MusicalPiece } from '../model/musical-piece';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-musical-piece-detail',
  templateUrl: './musical-piece-detail.component.html',
  styleUrls: ['./musical-piece-detail.component.scss'],
})
export class MusicalPieceDetailComponent implements OnInit {
  musicalPiece: MusicalPiece;

  constructor(private musicPieceService: MusicalPieceService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.musicalPiece = this.musicPieceService.getMusicalPiece(Number(this.route.snapshot.params.id));
  }
}
