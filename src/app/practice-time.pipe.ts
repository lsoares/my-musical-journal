import { Pipe, PipeTransform } from '@angular/core';
import { Practice } from './model/practice';

@Pipe({
  name: 'practiceTime'
})
export class PracticeTimePipe implements PipeTransform {

  static getDuration(practice: Practice) {
    return Math.round(((practice.endDate || new Date()).getTime() - practice.startDate.getTime()) / (60 * 1000));
  }

  static convertMinsToHrsMins(mins): string {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const hStr = h > 0 ? `${h}h` : '';
    const mStr = `${h > 0 && m < 10 ? '0' : ''}${mins % 60}m`;
    if (!h && !m) {
      return '0m';
    }
    return `${hStr}${mStr}`;
  }

  transform(practice: Practice, args?: any): string {
    return PracticeTimePipe.convertMinsToHrsMins(PracticeTimePipe.getDuration(practice));
  }
}
