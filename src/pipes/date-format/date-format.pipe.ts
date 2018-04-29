import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): any {
    if (!value) { return value; }
    if (!moment(new Date(value).toISOString()).isValid()) { return value; }
    return moment(new Date(value).toISOString()).format('LLL');
  }

}
