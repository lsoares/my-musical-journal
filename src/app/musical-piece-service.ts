import { Injectable } from '@angular/core';
import { MusicalPiece } from './model/musical-piece';
import { Practice } from './model/practice';

@Injectable({
  providedIn: 'root'
})
export class MusicalPieceService {

  constructor() {}

  getMusicalPieces(): MusicalPiece[] {
    return JSON.parse(localStorage.getItem('musicalPieces') || '[]');
  }

  getMusicalPiece(id: number): MusicalPiece {
    return this.getMusicalPieces().find(piece => piece.id === id);
  }

  createMusicalPiece(musicalPiece: MusicalPiece) {
    const musicalPieces = this.getMusicalPieces();
    const newMusicalPiece = new MusicalPiece(new Date().valueOf(), musicalPiece.title, musicalPiece.composer);
    musicalPieces.push(newMusicalPiece);
    localStorage.setItem('musicalPieces', JSON.stringify(musicalPieces));
    return newMusicalPiece.id;
  }

  loadPractices(id: number): Practice[] {
    return JSON.parse(localStorage.getItem(id.toString()) || '[]')
      .map((practice: Practice) =>
        new Practice(
          practice.startDate && new Date(practice.startDate),
          practice.endDate && new Date(practice.endDate)
        )
      );
  }

  storePractices(id: number, practices: Practice[]) {
    localStorage.setItem(id.toString(), JSON.stringify(practices));
  }
}
