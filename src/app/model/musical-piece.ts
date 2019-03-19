import { Practice } from './practice';

export class MusicalPiece {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly composer: string,
    readonly practices: Practice[] = []
  ) {
  }
}
