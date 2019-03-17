import { Injectable } from '@angular/core';
import { MusicalPiece } from './model/musical-piece';
import { Practice } from './model/practice';

@Injectable({
  providedIn: 'root'
})
export class MusicalPieceService {

  constructor() {
  }

  getMusicalPieces(): MusicalPiece[] {
    const pieces = JSON.parse(localStorage.getItem('musicalPieces') || '[]');
    return pieces.map(musicalPiece => {
      const practices = this.loadPractices(musicalPiece.id); // musicalPiece.practices.map(this.fixPracticesDates).reverse();
      return new MusicalPiece(musicalPiece.id, musicalPiece.title, musicalPiece.composer, practices);
    });
  }

  getMusicalPiece(id: number): MusicalPiece {
    return this.getMusicalPieces().find(piece => piece.id === id);
  }

  createMusicalPiece({title, composer}) {
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
    const practices = this.loadPractices(musicalPieceId);
    practices.push(new Practice(new Date().valueOf(), startDate, endDate));
    this.storePractices(musicalPieceId, practices);
  }

  startPractice(musicalPieceId: number) {
    const musicalPieces = JSON.parse(localStorage.getItem('musicalPieces') || '[]');
    musicalPieces // stop the others
      .filter(musicalPiece => musicalPiece.id !== musicalPieceId)
      .forEach(musicalPiece => this.stopPractice(musicalPiece.id));
    const practices = this.loadPractices(musicalPieceId);
    practices.push(new Practice(new Date().valueOf()));
    this.storePractices(musicalPieceId, practices);
  }

  stopPractice(musicalPieceId: number) {
    const practices = this.loadPractices(musicalPieceId);
    const lastPractice = practices.find(practice => practice.endDate == null);
    if (!lastPractice) {
      return;
    }

    const newPractices = practices.filter(practice => practice.id !== lastPractice.id);
    newPractices.push(new Practice(lastPractice.id, lastPractice.startDate, new Date()));
    this.storePractices(musicalPieceId, newPractices);
  }

  deletePractice(musicalPieceId: number, practiceId: number) {
    const practices = this.loadPractices(musicalPieceId)
      .filter(practice => practice.id !== practiceId);
    this.storePractices(musicalPieceId, practices);
  }

  private fixPracticesDates(practice: Practice) {
    return new Practice(
      practice.id,
      practice.startDate && new Date(practice.startDate),
      practice.endDate && new Date(practice.endDate)
    );
  }

  private loadPractices(musicalPieceId: number): Practice[] {
    return JSON.parse(localStorage.getItem(musicalPieceId.toString()) || '[]').map(this.fixPracticesDates);
  }

  private storePractices(musicalPieceId: number, practices: Practice[]) {
    practices = practices.sort((p1, p2) => p2.startDate.getTime() - p1.startDate.getTime());
    localStorage.setItem(musicalPieceId.toString(), JSON.stringify(practices));
  }
}
