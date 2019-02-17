import { Pipe, PipeTransform } from '@angular/core';
import { Practice } from './model/practice';

@Pipe({
  name: 'practiceTime'
})
export class PracticeTimePipe implements PipeTransform {

  transform(practice: Practice, args?: any): any {
    const minutes = Math.round(((practice.endDate || new Date()).getTime() - practice.startDate.getTime()) / (60 * 1000));
    return this.convertMinsToHrsMins(minutes);
  }

  convertMinsToHrsMins(mins) {
    const h = Math.floor(mins / 60);
    const hStr = h ? `${h}h;` : '';
    const mStr = `${mins % 60}m`;
    return `${hStr}${mStr}`;
  }
}
