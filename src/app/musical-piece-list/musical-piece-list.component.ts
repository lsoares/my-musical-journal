import { Component, OnInit } from '@angular/core';
import { MusicalPieceService } from '../musical-piece-service';
import { MusicalPiece } from '../model/musical-piece';

@Component({
  selector: 'app-musical-piece',
  templateUrl: './musical-piece-list.component.html',
  styleUrls: ['./musical-piece-list.component.scss']
})
export class MusicalPieceListComponent implements OnInit {
  musicalPieces: MusicalPiece[];

  constructor(private musicPieceService: MusicalPieceService) {}

  ngOnInit() {
    this.musicalPieces = this.musicPieceService.getMusicalPieces();
  }
}
