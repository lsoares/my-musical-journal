import { Injectable } from '@angular/core';
import { MusicalPiece } from './model/musical-piece';
import { Practice } from './model/practice';

@Injectable({
  providedIn: 'root'
})
export class MusicalPieceService {

  constructor() { }

  getMusicalPieces(): MusicalPiece[] {
    return JSON.parse(localStorage.getItem('musicalPieces') || '[]');
  }

  getMusicalPiece(id: number): MusicalPiece {
    return this.getMusicalPieces().find(piece => piece.id === id);
  }

  createMusicalPiece({ title, composer }) {
    const musicalPieces = this.getMusicalPieces();
    const newMusicalPiece = new MusicalPiece(new Date().valueOf(), title, composer);
    musicalPieces.push(newMusicalPiece);
    localStorage.setItem('musicalPieces', JSON.stringify(musicalPieces));
    return newMusicalPiece.id;
  }

  deleteMusicalPiece(id: number) {
    const musicalPieces = this.getMusicalPieces().filter(piece => piece.id !== id);
    localStorage.setItem('musicalPieces', JSON.stringify(musicalPieces));
    localStorage.removeItem(id.toString()); // remove practices
  }

  createPractice(musicalPieceId: number, startDate: Date, endDate: Date) {
    let practices = this.loadPractices(musicalPieceId);
    practices.push(new Practice(new Date().valueOf(), startDate, endDate));
    practices = practices.sort((p1, p2) => p1.startDate.getDate() - p2.startDate.getTime());
    this.storePractices(musicalPieceId, practices);
  }

  startPractice(musicalPieceId: number) {
    const practices = this.loadPractices(musicalPieceId);
    // TODO: stop other practice running!
    practices.push(new Practice(new Date().valueOf()));
    this.storePractices(musicalPieceId, practices);
  }

  stopPractice(musicalPieceId: number) {
    const practices = this.loadPractices(musicalPieceId);
    if (!practices.length) {
      throw (new Error(`No practice started for musical piece ${musicalPieceId}`));
    }
    const lastPractice = practices.pop();
    practices.push(new Practice(lastPractice.id, lastPractice.startDate, new Date()));
    this.storePractices(musicalPieceId, practices);
  }

  deletePractice(musicalPieceId: number, practiceId: number) {
    const practices = this.loadPractices(musicalPieceId)
        .filter(practice => practice.id !== practiceId);
    this.storePractices(musicalPieceId, practices);
  }

  loadPractices(musicalPieceId: number): Practice[] {
    return JSON.parse(localStorage.getItem(musicalPieceId.toString()) || '[]')
      .map((practice: Practice) =>
        new Practice(
          practice.id,
          practice.startDate && new Date(practice.startDate),
          practice.endDate && new Date(practice.endDate)
        )
      );
  }

  private storePractices(musicalPieceId: number, practices: Practice[]) {
    // TODO: sort by startDate!
    localStorage.setItem(musicalPieceId.toString(), JSON.stringify(practices));
  }
}
