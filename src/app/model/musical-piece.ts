import { Practice } from './practice';
import { read } from 'fs';

export class MusicalPiece {

   constructor(
      readonly id: number,
      readonly title: string,
      readonly composer: string,
      readonly practices: Practice[]
   ) { }
}
