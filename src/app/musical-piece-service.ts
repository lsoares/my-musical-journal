import { Injectable } from '@angular/core';
import { MusicalPiece } from './model/musical-piece';

@Injectable({
  providedIn: 'root'
})
export class MusicalPieceService {

  private musicalPieces = [
    new MusicalPiece(1, 'Liszt', 'The Great Piano Works - Part 1'),
    new MusicalPiece(2, 'Chopin', 'Piano Solo (Vadim Chaimovich)'),
    new MusicalPiece(3, 'Schubert\'s', 'Fantasy in F minor for Piano Four Hands, D940')
  ];

  constructor() { }

  getMusicalPieces(): MusicalPiece[] {
    return this.musicalPieces;
  }

  getMusicalPiece(id: number): MusicalPiece {
    return this.musicalPieces.find(piece => piece.id === id);
  }
}
