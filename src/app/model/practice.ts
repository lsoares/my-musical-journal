export class Practice {
  constructor(
    readonly id: number,
    readonly startDate: Date = new Date(),
    readonly endDate: Date = null
  ) {
  }
}
