import { Component, OnInit } from '@angular/core';
import { MusicalPieceService } from '../musical-piece-service';
import { MusicalPiece } from '../musical-piece';

@Component({
  selector: 'app-musical-piece',
  templateUrl: './musical-piece.component.html',
  styleUrls: ['./musical-piece.component.scss']
})
export class MusicalPieceComponent implements OnInit {

  musicalPieces: MusicalPiece[];

  constructor(private musicPieceService: MusicalPieceService) { }

  ngOnInit() {
    this.musicalPieces = this.musicPieceService.getMusicalPieces();
  }
}
