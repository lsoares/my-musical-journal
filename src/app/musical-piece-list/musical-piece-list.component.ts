import { Component, OnInit } from '@angular/core';
import { MusicalPieceService } from '../musical-piece-service';
import { MusicalPiece } from '../model/musical-piece';

@Component({
  selector: 'app-musical-piece-list',
  templateUrl: './musical-piece-list.component.html',
  styleUrls: ['./musical-piece-list.component.scss']
})
export class MusicalPieceListComponent implements OnInit {
  musicalPieces: MusicalPiece[];
  creating = false;

  constructor(private readonly musicPieceService: MusicalPieceService) {
  }

  cancelAddMusicalPiece() {
    this.creating = false;
  }

  ngOnInit() {
    this.musicalPieces = this.musicPieceService.getMusicalPieces();
  }
}
