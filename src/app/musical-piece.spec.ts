import { MusicalPiece } from './musical-piece';

describe('MusicalPiece', () => {
  it('creates an instance', () => {
    expect(new MusicalPiece('1dfdf', 'dfdsf')).toBeTruthy();
  });
});
