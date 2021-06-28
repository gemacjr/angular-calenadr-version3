import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'todayIcon',
})
export class TodayIconPipe implements PipeTransform {
  transform(value: string): any{

    const date = this.formatDateForMoment(value);
    const inDate = moment(date);
    const diff = moment().format('YYYY-MM-DD')
    return inDate.isSame(diff);
}

  private formatDateForMoment(dateStr) {
    const subDates = dateStr.split('/');
    return subDates[2] + '-' + subDates[0] + '-' + subDates[1];
  }
}
