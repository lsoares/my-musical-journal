import { MusicalPiece } from './musical-piece';

export class Practice {
   constructor(
      readonly startDate: Date = new Date(),
      readonly endDate: Date = null
   ) { }
}
