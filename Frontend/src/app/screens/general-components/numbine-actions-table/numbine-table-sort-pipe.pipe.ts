import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'tableSort',
  pure: true
})
export class NumbineTableSortPipePipe implements PipeTransform {

  transform(value: any[], column: number, order: string=''): any[] {

    if(order == 'asc'){
      let sortedValue = value.sort((a, b) => {
        if (a[column] > b[column]) {
          return 1;
        }
        if (a[column] < b[column]) {
          return -1;
        }
        return 0;
      })
      return sortedValue;
    }
    else{
      let sortedValue = value.sort((a, b) => {
        if (a[column] > b[column]) {
          return -1;
        }
        if (a[column] < b[column]) {
          return 1;
        }
        return 0;
      })
      return sortedValue;
    }
  }

}
