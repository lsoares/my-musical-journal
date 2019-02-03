import { Injectable } from '@angular/core';
import { MusicalPiece } from './musical-piece';

@Injectable({
  providedIn: 'root'
})
export class MusicalPieceService {

  constructor() { }

  getMusicalPieces(): MusicalPiece[] {
    return [
      new MusicalPiece('Liszt', 'The Great Piano Works - Part 1'),
      new MusicalPiece('Chopin', 'Piano Solo (Vadim Chaimovich)'),
      new MusicalPiece('Schubert\'s', 'Fantasy in F minor for Piano Four Hands, D940')
    ];
  }
}
