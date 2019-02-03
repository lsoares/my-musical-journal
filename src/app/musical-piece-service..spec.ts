import { TestBed } from '@angular/core/testing';
import { MusicalPieceService } from './musical-piece-service';

describe('MusicalPiecesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('creates', () => {
    expect(TestBed.get(MusicalPieceService)).toBeTruthy();
  });
});
