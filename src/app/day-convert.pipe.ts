import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayConvert',
})
export class DayConvertPipe implements PipeTransform {
  transform(value: any): string {
    let dayStrConvert;
    let tmp = value.replace(/^0+/, '');
    dayStrConvert = tmp;

    return dayStrConvert;
  }
}
